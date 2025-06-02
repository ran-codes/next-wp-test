import { getAllCategories } from "@/lib/wordpress";
import { Section, Container, Prose } from "@/components/craft";
import { Metadata } from "next";
import BackButton from "@/components/back";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All Categories",
  description: "Browse all post categories",
  alternates: {
    canonical: "/categories",
  },
};

export default async function Page() {
  const categories = await getAllCategories();

  return (
    <Section>
      <Container className="space-y-6">
        <Prose className="mb-8">
          <h2>All Categories</h2>
          <ul className="grid">
            {categories.map((category) => (
              <li key={category.id}>
                <Link href={`/categories/${category.slug}`}>
                  {category.name} ({category.count} posts)
                </Link>
              </li>
            ))}
          </ul>
        </Prose>
        <BackButton />
      </Container>
    </Section>
  );
}
