import { Box, Theme } from "@radix-ui/themes";

export default function ExamplePage() {
  return (
    <Box asChild p="9">
      <Theme
        accentColor="indigo"
        grayColor="mauve"
        className="radix-themes-default-fonts"
      >
        Some Admin Route
      </Theme>
    </Box>
  );
}
