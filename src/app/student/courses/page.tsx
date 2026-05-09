import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function StudentCoursesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Browse Courses</h1>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input className="pl-10" placeholder="Search for courses..." />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Course cards will go here */}
        <p className="text-zinc-500 col-span-full py-12 text-center">
          Start exploring our courses catalog.
        </p>

         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nulla quae aut velit eos vero dolores quod perferendis! Porro, ratione!</p>
         <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita esse hic est. Veritatis dicta nam adipisci cupiditate unde, sed laborum eaque. Perferendis voluptatum, enim esse deserunt explicabo, cum saepe modi quo alias error nostrum! Labore at, adipisci blanditiis et quam est libero quisquam ratione, doloribus officiis repellendus magnam odio ullam consectetur esse quia similique eum dolore consequatur unde eos harum hic! Temporibus, iste repellat non excepturi provident ab deleniti a dolore minus fuga deserunt veniam ad quasi officia in optio harum magni maiores officiis impedit quas beatae ut inventore necessitatibus. Optio molestiae voluptates voluptas eligendi sunt error eveniet voluptatum reprehenderit porro voluptatibus quibusdam maiores eaque numquam ratione tenetur, odio totam facere quidem atque doloremque doloribus ab quas perspiciatis nesciunt. Impedit, tempore! Corrupti eveniet ipsam, et laboriosam, odio excepturi doloribus ducimus omnis odit nulla facilis maxime neque totam eligendi delectus praesentium possimus sit quo voluptatem beatae accusamus similique quam molestiae! Saepe nemo perferendis repellendus iusto tempore culpa quas voluptatem nihil, sapiente ipsum libero iure eius. Tempore eum pariatur, molestias ea, natus dolore reiciendis praesentium officia, voluptates et ducimus. Pariatur itaque at excepturi repellat corporis. Reiciendis molestias doloremque quae dolorum exercitationem assumenda totam, incidunt atque, recusandae aliquam harum nemo explicabo sint quia?</p>
      </div>
    </div>
  );
}
