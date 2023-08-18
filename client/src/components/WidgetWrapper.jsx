import { Box } from "@mui/material";
// MUI (Material-UI) adlı React UI kütüphanesinin Box bileşenini, @mui/material modülünden import eder.
import { styled } from "@mui/system";
// MUI (Material-UI) adlı React UI kütüphanesinin styled fonksiyonunu, @mui/system modülünden import eder.

const WidgetWrapper = styled(Box)(({ theme }) => ({
  // WidgetWrapper adında bir bileşen tanımlanır ve Box bileşenine styled metodu uygulanır. styled-components paketi, bir bileşeni diğer bileşenler gibi stillendirmek için kullanılan bir fonksiyonelite sağlar.
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "0.75rem",
}));
// Box bileşenine uygulanan stilleri kullanarak WidgetWrapper adında bir bileşen tanımlar. 

export default WidgetWrapper;
// WidgetWrapper bileşenini, bu modülü kullanan diğer dosyalarda kullanılabilir hale getirir.