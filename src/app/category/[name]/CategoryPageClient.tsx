"use client";
import Link from "next/link";
import styles from "./category.module.css";
import {useState} from "react";

export default function CategoryPageClient({
                                               files,
                                               decodedName,
                                               isVerification,
                                           }: {
    files: string[];
    decodedName: string;
    isVerification: boolean;
}) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <main className={styles.page}>
            <Link href="/" className={styles.logoContainer}>
                <img src="/neltellogo.png" alt="NELTEL Logo" width={200} height={80}/>
            </Link>

            <h1 className={styles.title}>{decodedName}</h1>

            <div className={styles.grid}>
                {isVerification
                    ? files.map((pdf, i) => (
                        <div key={i} className={styles.pdfCard}>
                            <a
                                href={pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.pdfLink}
                            >
                                <span className={styles.pdfIcon}>📄</span>
                                <span>
                    {i === 0 ? "PMS Testskema - Skipperen" : "Verificering stand"}
                  </span>
                            </a>
                        </div>
                    ))
                    : files.map((img, i) => (
                        <div
                            key={i}
                            className={styles.card}
                            onClick={() => setSelectedImage(img)}
                        >
                            <img
                                src={img}
                                alt={`${decodedName} ${i + 1}`}
                                className={styles.image}
                            />
                        </div>
                    ))}
            </div>

            {selectedImage && (
                <div
                    className={styles.modalOverlay}
                    onClick={() => setSelectedImage(null)}
                >
                    <img src={selectedImage} alt="Enlarged view" className={styles.modalImage}/>
                </div>
            )}
        </main>
    );
}
