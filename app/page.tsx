import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Rohit.cpp Portfolio
      </h1>
      <p className="mb-4">
        {`Hola, I'm computer science student,
        I Love what i do, i strongly believes in be a multidimensional
        person(Jack of All Trades), polymath Learning.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
