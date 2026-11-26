import { MDXRemote } from "next-mdx-remote/rsc";

type MdxContentProps = {
  source: string;
};

export function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="prose-case">
      <MDXRemote source={source} />
    </div>
  );
}
