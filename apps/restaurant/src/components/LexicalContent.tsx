import type { SiteContent } from "@repo/ui";

type LexicalNode = {
  type: string;
  text?: string;
  format?: number; // bitmask: bold=1, italic=2, strikethrough=4, underline=8
  children?: LexicalNode[];
  [k: string]: unknown;
};

function renderNode(node: LexicalNode, index: number): React.ReactNode {
  if (node.type === "text") {
    let content: React.ReactNode = node.text ?? "";
    if (node.format) {
      if (node.format & 1) content = <strong key="b">{content}</strong>;
      if (node.format & 2) content = <em key="i">{content}</em>;
    }
    return <span key={index}>{content}</span>;
  }
  if (node.type === "paragraph") {
    return <p key={index}>{node.children?.map((n, i) => renderNode(n, i))}</p>;
  }
  if (node.type === "linebreak") {
    return <br key={index} />;
  }
  // render any other block types (headings, lists, etc.) as paragraphs
  if (node.children?.length) {
    return <p key={index}>{node.children.map((n, i) => renderNode(n, i))}</p>;
  }
  return null;
}

interface Props {
  content: SiteContent["story"];
  className?: string;
}

export function LexicalContent({ content, className }: Props) {
  if (!content?.root?.children?.length) return null;
  return (
    <div className={className}>
      {content.root.children.map((node, i) => renderNode(node as LexicalNode, i))}
    </div>
  );
}
