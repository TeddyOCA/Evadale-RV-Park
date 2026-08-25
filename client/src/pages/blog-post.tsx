import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Phone, Calendar, ArrowLeft, Tag, ArrowRight, Loader2 } from "lucide-react";
import evadaleLogo from "@assets/evadale_badge_transparent_1762195601095.png";
import type { BlogPost } from "@shared/schema";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function MarkdownContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold text-foreground font-serif mt-8 mb-4">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-xl font-bold text-foreground mt-6 mb-3">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <p key={i} className="font-bold text-foreground mb-2">
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.startsWith('- **')) {
      const match = line.match(/^- \*\*(.+?)\*\*\s*[—–-]?\s*(.*)$/);
      if (match) {
        elements.push(
          <li key={i} className="mb-2 text-muted-foreground ml-4 list-disc">
            <span className="font-bold text-foreground">{match[1]}</span>
            {match[2] ? ` — ${match[2]}` : ''}
          </li>
        );
      } else {
        elements.push(
          <li key={i} className="mb-2 text-muted-foreground ml-4 list-disc">
            {line.slice(2)}
          </li>
        );
      }
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={i} className="mb-2 text-muted-foreground ml-4 list-disc">
          {line.slice(2)}
        </li>
      );
    } else if (line.startsWith('| ') && !line.startsWith('|--') && !line.startsWith('|-')) {
      const cells = line.split('|').filter(c => c.trim()).map(c => c.trim());
      const isHeader = i + 1 < lines.length && lines[i + 1].includes('---');
      elements.push(
        <tr key={i} className={isHeader ? 'bg-primary/10' : 'border-b border-border'}>
          {cells.map((cell, j) =>
            isHeader ? (
              <th key={j} className="px-4 py-2 text-left font-bold text-foreground text-sm">{cell}</th>
            ) : (
              <td key={j} className="px-4 py-2 text-muted-foreground text-sm">{cell}</td>
            )
          )}
        </tr>
      );
    } else if (line.includes('---') && line.includes('|')) {
      // skip table separator
    } else if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />);
    } else {
      const formatted = line
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground font-bold">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>');
      elements.push(
        <p key={i} className="text-muted-foreground leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: formatted }} />
      );
    }
    i++;
  }

  const result: JSX.Element[] = [];
  let tableRows: JSX.Element[] = [];

  for (const el of elements) {
    if (el.type === 'tr') {
      tableRows.push(el);
    } else {
      if (tableRows.length > 0) {
        result.push(
          <div key={`table-${result.length}`} className="overflow-x-auto my-6">
            <table className="w-full border border-border rounded-lg overflow-hidden">
              <tbody>{tableRows}</tbody>
            </table>
          </div>
        );
        tableRows = [];
      }
      result.push(el);
    }
  }

  if (tableRows.length > 0) {
    result.push(
      <div key={`table-${result.length}`} className="overflow-x-auto my-6">
        <table className="w-full border border-border rounded-lg overflow-hidden">
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    );
  }

  return <div>{result}</div>;
}

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();

  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: ['/api/blog', params.slug],
  });

  const { data: allPosts } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Evadale RV Park Blog`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", post.metaDescription);
    }
  }, [post]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Article Not Found</h1>
          <Link href="/blog" className="text-primary hover:underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  const currentIndex = allPosts?.findIndex(p => p.slug === post.slug) ?? -1;
  const prevPost = currentIndex > 0 && allPosts ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && allPosts && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-foreground text-background py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
              <img src={evadaleLogo} alt="Evadale RV Park Logo" className="w-12 h-12 object-contain" />
              <div>
                <h1 className="text-xl font-bold font-serif">Evadale RV Park</h1>
                <p className="text-background/70 text-sm">Affordable. Convenient. All-Inclusive.</p>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-6 text-background/90">
              <Link href="/" className="hover:text-accent transition-colors">Home</Link>
              <Link href="/blog" className="hover:text-accent transition-colors">Blog</Link>
              <a href="tel:4092768830" className="flex items-center space-x-2 hover:text-accent transition-colors">
                <Phone className="w-4 h-4" />
                <span>(409) 276-8830</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <Link href="/blog" className="inline-flex items-center space-x-2 text-primary hover:underline mb-6">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blog</span>
            </Link>

            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground mb-3">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.publishedAt ? new Date(post.publishedAt).toISOString() : ''}>
                  {post.publishedAt ? formatDate(post.publishedAt.toString()) : ''}
                </time>
                <span>·</span>
                <span>{post.author}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground font-serif mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center space-x-1 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                    <Tag className="w-3 h-3" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Article Content */}
            <div className="prose-custom">
              <MarkdownContent content={post.content} />
            </div>

            {/* CTA Box */}
            <div className="bg-primary text-primary-foreground rounded-2xl p-6 md:p-8 mt-10 text-center">
              <h3 className="text-2xl font-bold font-serif mb-2">Ready to Reserve Your Spot?</h3>
              <p className="text-primary-foreground/90 mb-4">$425/month. All-inclusive. Full hookups. No hassle.</p>
              <a
                href="tel:4092768830"
                className="inline-flex items-center space-x-2 bg-white text-primary px-6 py-3 rounded-xl font-bold hover:bg-accent hover:text-accent-foreground transition-colors shadow-lg"
              >
                <Phone className="w-5 h-5" />
                <span>Call Brian: (409) 276-8830</span>
              </a>
            </div>

            {/* Prev/Next Navigation */}
            <div className="grid sm:grid-cols-2 gap-4 mt-10">
              {prevPost ? (
                <Link href={`/blog/${prevPost.slug}`} className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
                  <span className="text-xs text-muted-foreground flex items-center space-x-1 mb-1">
                    <ArrowLeft className="w-3 h-3" />
                    <span>Previous</span>
                  </span>
                  <span className="text-sm font-semibold text-foreground line-clamp-2">{prevPost.title}</span>
                </Link>
              ) : <div />}
              {nextPost ? (
                <Link href={`/blog/${nextPost.slug}`} className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow text-right">
                  <span className="text-xs text-muted-foreground flex items-center justify-end space-x-1 mb-1">
                    <span>Next</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                  <span className="text-sm font-semibold text-foreground line-clamp-2">{nextPost.title}</span>
                </Link>
              ) : <div />}
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 text-center text-sm text-background/60">
          <p>&copy; {new Date().getFullYear()} Evadale RV Park. 147 CR 847, Evadale, TX 77615</p>
        </div>
      </footer>
    </div>
  );
}
