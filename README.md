This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

/\*

DROP FUNCTION update_compras_itens_falta;
DROP TRIGGER update_compras_itens_falta_trigger;

UPDATE compras set "dtFim" = null where id = 1;
update compras_itens set falta = false;

CREATE OR REPLACE FUNCTION update_compras_itens_falta()
RETURNS TRIGGER AS $$
BEGIN
-- Only proceed if ftFim has changed
IF (OLD."dtFim" IS DISTINCT FROM NEW."dtFim") AND (NEW."dtFim" IS NOT NULL) THEN
-- Update all related items in compras_itens
UPDATE compras_itens
SET falta = true
WHERE id_compras = NEW.id
AND confirmed = false
AND falta = false;
END IF;

RETURN NEW;
END;

$$
LANGUAGE plpgsql;

-- Create the trigger
DO $$ BEGIN
  CREATE TRIGGER update_compras_itens_falta_trigger
    AFTER UPDATE OF "dtFim" ON compras
    FOR EACH ROW
    EXECUTE FUNCTION update_compras_itens_falta();
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

*/
$$

CREATE OR REPLACE FUNCTION clone_compras_itens(idBase integer, idClone integer, idUsuario integer)
RETURNS void AS $$
BEGIN
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

INSERT INTO compras_usuarios (
usuario_id,
compra_id
)
VALUES (
idUsuario,
idClone
);

END;

$$
LANGUAGE plpgsql;
$$
