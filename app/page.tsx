import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="w-80 h-64 relative rounded-lg overflow-hidden">
          <img 
            src="/images/ChatGPT Image Mar 30, 2025, 06_17_29 AM.png" 
            alt="Profile photo" 
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tighter mb-4">
            Rohit.cpp Portfolio
          </h1>
          <p className="mb-4">
            {`Hola, I'm computer science student,
            I Love what i do, i strongly believes in be a multidimensional
            person(Jack of All Trades), polymath Learning.`}
          </p>
        </div>
      </div>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
