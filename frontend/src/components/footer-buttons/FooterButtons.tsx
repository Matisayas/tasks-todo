"use client";

import { Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";

interface FooterButtonsProps {
  loading?: boolean;
  onPrimaryClick: () => void;
  secondaryLinkTo?: string;
  primaryLabel: string;
  secondaryLabel?: string;
  noSpacing?: boolean;
  secondaryClick?: () => void;
  primaryDataCy?: string;
  secondaryDataCy?: string;
}

export default function FooterButtons(props: FooterButtonsProps) {
  const {
    loading,
    onPrimaryClick,
    primaryLabel,
    secondaryLabel = "Volver",
    secondaryLinkTo,
    secondaryClick,
    primaryDataCy = "save-button",
    secondaryDataCy = "cancel-button",
  } = props;

  const { push } = useRouter();

  const onSecondaryClick = () => {
    if (secondaryClick) secondaryClick();
    if (secondaryLinkTo) push(secondaryLinkTo);
  };

  return (
    <Stack
      direction="row"
      gap={{ xs: 2, md: 3 }}
      justifyContent={{ sm: "end", xs: "unset" }}
    >
      <Button
        sx={{ flex: { xs: 1, sm: "initial" } }}
        onClick={onSecondaryClick}
        disabled={loading}
        variant="outlined"
        data-cy={secondaryDataCy}
      >
        {secondaryLabel}
      </Button>
      <Button
        sx={{ flex: { xs: 1, sm: "initial" } }}
        onClick={onPrimaryClick}
        variant="contained"
        disabled={loading}
        data-cy={primaryDataCy}
      >
        {primaryLabel}
      </Button>
    </Stack>
  );
}
