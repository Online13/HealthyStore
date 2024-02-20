import { createClient, type VercelClient } from "@vercel/postgres";

async function createMedicine(client: VercelClient) {
   await client.sql`
		CREATE TABLE IF NOT EXISTS medicine (
			id SERIAL PRIMARY KEY,
			name VARCHAR(100) NOT NULL,
			description TEXT NOT NULL
		);
	`;
}
async function createSymptom(client: VercelClient) {
   await client.sql`
		CREATE TABLE IF NOT EXISTS symptom (
			id SERIAL PRIMARY KEY,
			name VARCHAR(100) NOT NULL,
			description TEXT NOT NULL
		);
	`;
}

async function createMedicineEffect(client: VercelClient) {
   await client.sql`
		CREATE TABLE IF NOT EXISTS medicine_effect (
			medicine_id INT REFERENCES medicine(id),
			symptom_id INT REFERENCES symptom(id),
			effect INT NOT NULL
		);
	`;
}

(async function () {
   const client = createClient();
   client.connect();
   console.log("Init database");

   try {
      await createMedicine(client);
      await createSymptom(client);
      await createMedicineEffect(client);
   } catch (err) {
      console.error("error" + err);
   } finally {
      console.log("Connection closed");
      await client.end();
   }
})();
