import { createClient, type VercelClient } from "@vercel/postgres";

async function insertMedicine(client: VercelClient) {
   await client.sql`
		INSERT INTO medicine (name, description)
		SELECT 
			CONCAT('Medicine ', md.r),
			CONCAT('Description for medicine ', md.r)
		FROM 
			generate_series(1, 10) AS md(r)
		ON CONFLICT DO NOTHING;
	`;
}
async function insertSymptom(client: VercelClient) {
   await client.sql`
		INSERT INTO symptom (name, description)
		SELECT 
			CONCAT('Symptom ', sy.r),
			CONCAT('Description for symptom ', sy.r)
		FROM 
			generate_series(1, 10) AS sy(r)
		ON CONFLICT DO NOTHING;
	`;
}

async function insertMedicineEffect(client: VercelClient) {
   await client.sql`
		INSERT INTO medicine_effect (medicine_id, symptom_id, effect)
		SELECT 
			(random() * 10 + 1)::INT,
			(random() * 10 + 1)::INT,
			(random() * 100)::INT
		FROM 
			generate_series(1, 10)
		ON CONFLICT DO NOTHING;
	`;
}

(async function () {
   const client = createClient();
   client.connect();
   console.log("Init database");

   try {
      await insertMedicine(client);
      await insertSymptom(client);
      await insertMedicineEffect(client);
   } catch (err) {
      console.error("error" + err);
   } finally {
      console.log("Connection closed");
      await client.end();
   }
})();

