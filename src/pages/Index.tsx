
import { Layout } from "@/components/Layout";
import Header from "@/components/Header";
import PostFeed from "@/components/PostFeed";

const Index = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <PostFeed />
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Index;
