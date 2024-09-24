import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";

// Initialize the EdgeStore
const es = initEdgeStore.create();

// Define the router with image bucket
const edgeStoreRouter = es.router({
    myPublicImages: es.imageBucket(),
});

// Create handler for Next.js API routes
const handler = createEdgeStoreNextHandler({
    router: edgeStoreRouter,
});

export { handler as GET, handler as POST };
export type EdgeStoreRouter = typeof edgeStoreRouter;
