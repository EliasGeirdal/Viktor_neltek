import path from "path";
import fs from "fs";
import CategoryPageClient from "./CategoryPageClient";

type CategoryPageProps = {
    params: Promise<{ name: string }>;
};

export function generateStaticParams() {
    return [
        {name: "Økonomi"},
        {name: "Oversigt"},
        {name: "Projektering"},
        {name: "Tavledokumentation"},
        {name: "Verificering"},
    ];
}

export default async function CategoryPage({params}: CategoryPageProps) {
    const {name} = await params;
    const decodedName = decodeURIComponent(name);
    const folderName = decodedName.toLowerCase();
    const isVerification = folderName === "verificering";

    const folderPath = path.join(process.cwd(), "public", "imgs", folderName);

    let files: string[] = [];
    try {
        const allFiles = fs.readdirSync(folderPath);
        files = allFiles
            .filter((file) =>
                isVerification ? file.endsWith(".pdf") : /\.(png|jpg|jpeg)$/i.test(file)
            )
            .sort()
            .map((f) => `/imgs/${folderName}/${f}`);
    } catch (err) {
        console.error("Folder not found or empty:", folderPath, err);
    }

    return (
        <CategoryPageClient
            files={files}
            decodedName={decodedName}
            isVerification={isVerification}
        />
    );
}
