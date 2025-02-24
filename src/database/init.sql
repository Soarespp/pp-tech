-- Criação das tabelas
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name TEXT UNIQUE NOT NULL,
  nome TEXT NOT NULL,
  documento TEXT,
  tipo TEXT,
  email TEXT UNIQUE NOT NULL,
  dt_nascimento DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE TABLE IF NOT EXISTS compras (
  id SERIAL PRIMARY KEY,
  dtFim TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE TABLE IF NOT EXISTS produtos (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE TABLE IF NOT EXISTS compras_usuarios (
  id SERIAL PRIMARY KEY,
  usuario_id UUID REFERENCES users(id),
  compra_id INTEGER REFERENCES compras(id),
  data_alteracao TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  UNIQUE(usuario_id, compra_id)
);

CREATE TABLE IF NOT EXISTS compras_itens (
  id SERIAL PRIMARY KEY,
  id_compras INTEGER REFERENCES compras(id),
  id_produto INTEGER REFERENCES produtos(id),
  qt INTEGER DEFAULT 1,
  confirmed BOOLEAN DEFAULT FALSE,
  falta BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_compras_usuarios_usuario ON compras_usuarios(usuario_id);
CREATE INDEX IF NOT EXISTS idx_compras_usuarios_compra ON compras_usuarios(compra_id);
CREATE INDEX IF NOT EXISTS idx_compras_itens_compra ON compras_itens(id_compras);
CREATE INDEX IF NOT EXISTS idx_compras_itens_produto ON compras_itens(id_produto);

-- Function para clonar itens de uma compra
CREATE OR REPLACE FUNCTION clone_compras_itens(idBase integer, idClone integer, idUsuario integer)
RETURNS void AS $$
BEGIN
  -- Validate input parameters
  IF idBase IS NULL OR idClone IS NULL OR idUsuario IS NULL THEN
    RAISE EXCEPTION 'All parameters (idBase, idClone, idUsuario) must not be null';
  END IF;

  -- Copy items from source compra to target compra
  WITH source_items AS (
    SELECT 
      id_produto,
      qt,
      confirmed,
      falta
    FROM compras_itens
    WHERE id_compras = idBase
  )
  INSERT INTO compras_itens (
    id_compras,
    id_produto,
    qt,
    confirmed,
    falta
  )
  SELECT 
    idClone,
    id_produto,
    qt,
    confirmed,
    falta
  FROM source_items;

  -- Associate the user with the cloned compra
  INSERT INTO compras_usuarios (
    usuario_id,
    compra_id
  )
  VALUES (
    idUsuario,
    idClone
  );
END;
$$ LANGUAGE plpgsql;

-- Políticas de segurança (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE compras ENABLE ROW LEVEL SECURITY;
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE compras_usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE compras_itens ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Dados iniciais (se necessário)
INSERT INTO produtos (name) VALUES
  ('Arroz'),
  ('Feijão'),
  ('Açúcar'),
  ('Café')
ON CONFLICT DO NOTHING; 

CREATE OR REPLACE FUNCTION update_compras_itens_falta()
RETURNS TRIGGER AS $$
BEGIN
  -- Only proceed if ftFim has changed
  IF (OLD."dtFim" IS DISTINCT FROM NEW."dtFim") AND (NEW."dtFim" IS NOT NULL)  THEN
    -- Update all related items in compras_itens
    UPDATE compras_itens
    SET falta = true
    WHERE id_compras = NEW.id
    AND confirmed = false
    AND falta = false;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DO $$ BEGIN
  CREATE TRIGGER update_compras_itens_falta_trigger
    AFTER UPDATE OF "dtFim" ON compras
    FOR EACH ROW
    EXECUTE FUNCTION update_compras_itens_falta();
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;


CREATE OR REPLACE FUNCTION clone_compras_itens(idBase integer, idClone integer, idUsuario integer, finalizarCompras integer)
RETURNS void AS $$
BEGIN
  -- Validate input parameters
  IF idBase IS NULL OR idClone IS NULL OR idUsuario IS NULL THEN
    RAISE EXCEPTION 'All parameters (idBase, idClone, idUsuario) must not be null';
  END IF;

  IF finalizarCompras IS NOT NULL THEN
    UPDATE compras SET "dtFim" = now() WHERE id = finalizarCompras;
  END IF;

  -- Copy items from source compra to target compra
  WITH source_items AS (
    SELECT 
      id_produto,
      qt,
      confirmed,
      falta
    FROM compras_itens
    WHERE id_compras = idBase
  )
  INSERT INTO compras_itens (
    id_compras,
    id_produto,
    qt,
    confirmed,
    falta
  )
  SELECT 
    idClone,
    id_produto,
    qt,
    false,
    false
  FROM source_items;

  -- Associate the user with the cloned compra
  INSERT INTO compras_usuarios (
    usuario_id,
    compra_id
  )
  VALUES (
    idUsuario,
    idClone
  );
  
END;
$$ LANGUAGE plpgsql;