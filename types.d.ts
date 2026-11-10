import type { Timestamp } from "firebase/firestore";

interface Blog {
    id: string;
    title: string;
    body: string;
    createdAt: Timestamp | Date;
    updatedAt: Timestamp;
}
