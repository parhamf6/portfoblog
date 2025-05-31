'use client';
// import { AnimatedBorder } from './animated-border';
import Image from "next/image";
type ProjectCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  projectUrl?: string;
  githubUrl?: string;
};

export default function BlogHeroCard({
  title,
  description,
  imageUrl,
  tags,
  projectUrl,
}: ProjectCardProps) {
  return (
    <div className="flex gap-4 ml-8 mr-8">
        <div>
            <Image
                src={"/images/gitfather.png"}
                width={250}
                height={250}
                className="rounded-[16px]"
            />
        </div>
        <div className="flex flex-col items-start justify-between gap-2">
            <div className="text-2xl font-semibold">
                The Power of Python
            </div>
            <div className="font-extralight">
                A Git automation CLI with Telegram bot features.
            </div>
            <div>
                Python Back-End
            </div>
            <div>
                actions
            </div>
        </div>
    </div>
  );
}
