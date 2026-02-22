import { Suspense } from "react";
// components
import ServiceClient from "@/components/ServiceClient";

export default async function ServicePage() {
    return (
        <div className="overflow-hidden">
            <Suspense fallback={null}>
                <ServiceClient />
            </Suspense>
        </div>
    );
}