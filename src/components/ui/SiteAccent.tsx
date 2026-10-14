import { supabase } from "@/lib/supabase";
import { generateThemeCss } from "@/lib/theme";

const DEFAULT_ACCENT = "#a96f6b";

export default async function SiteAccent() {
  const { data } = await supabase
    .from("profile")
    .select("accent_color")
    .not("accent_color", "is", null)
    .limit(1)
    .maybeSingle();

  const rawAccent = data?.accent_color;
  const accent =
    rawAccent && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(rawAccent)
      ? rawAccent
      : DEFAULT_ACCENT;

  const css = generateThemeCss(accent);

  return (
    <style
      id="site-theme-variables"
      dangerouslySetInnerHTML={{
        __html: css,
      }}
    />
  );
}
