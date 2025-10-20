import styles from "./page.module.css";
import Link from "next/link";
export default function Home() {
    const categories = ["Oversigt", "Tavledokumentation", "Økonomi", "Projektering", "Verificering"];

    return (
        <main className={styles.home}>
            <div className={styles.logoContainer}>
                <img
                    src="/neltellogo.png"
                    alt="NELTEL Logo"
                    width={200}
                    height={80}
                />
            </div>

            <h1 className={styles.title}>Choose a Category</h1>

            <div className={styles.categories}>
                {categories.map((cat) => (
                    <Link key={cat} href={`/category/${cat}`} className={styles.categoryCard}>
                        {cat}
                    </Link>
                ))}
            </div>
        </main>
    );
}
