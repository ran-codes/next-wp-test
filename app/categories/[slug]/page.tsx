import { getAllCategories } from "@/lib/wordpress";
import { Section, Container, Prose } from "@/components/craft";
import { Metadata } from "next";
import BackButton from "@/components/back";

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getAllCategories();
  const category = categories.find(cat => cat.slug === slug);

  if (!category) {
    return {};
  }

  return {
    title: `Category: ${category.name}`,
    description: `Posts in the ${category.name} category`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categories = await getAllCategories();
  const category = categories.find(cat => cat.slug === slug);

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <Section>
      <Container className="space-y-6">
        <Prose className="mb-8">
          <h2>Category: {category.name}</h2>
          <p>{category.description || `Posts in the ${category.name} category`}</p>
          <p><strong>{category.count}</strong> posts in this category</p>
        </Prose>
        <BackButton />
      </Container>
    </Section>
  );
}
