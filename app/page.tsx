import { BlogPosts } from "app/components/posts";
import Image from "next/image";

export default function Page() {
  return (
    <section>
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="w-48 h-48 relative rounded-lg overflow-hidden">
          <Image 
            src="/images/profile.jpg" 
            alt="Profile photo" 
            fill
            priority
            className="object-cover"
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
