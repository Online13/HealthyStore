
export declare global {
   namespace NodeJS {
      interface ProcessEnv {
         PORT: string | undefined;
         HOST: string | undefined;
      }
   }
}