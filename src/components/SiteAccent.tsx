import { supabase } from "@/lib/supabase";

export default async function SiteAccent() {
  const { data } = await supabase
    .from("profile")
    .select("accent_color")
    .limit(1)
    .maybeSingle();

  const accent = data?.accent_color;
  if (!accent || !/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(accent)) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          :root {
            --accent: ${accent};
          }
        `,
      }}
    />
  );
}
