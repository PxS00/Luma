export type molduraImgProps = {
  src: string; // imagem do passo (step.img)
  alt?: string;
  frameSrcMobile: string; // moldura para mobile
  frameSrcDesktop: string; // moldura para desktop
  className?: string;
  aspect?: string; // ex: "aspect-video" | "aspect-[9/16]"
};
