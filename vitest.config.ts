import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
    test: {
        // run on Node, not on DOM
        // For React components, we typically pair that 
        //      with something like @testing-library/react
        environment: "node",
    },
    resolve: {
        alias: {
            // Maps @/ to the project root so imports like @/types/gallery
            "@": path.resolve(__dirname, "."),
        },
    },
});
