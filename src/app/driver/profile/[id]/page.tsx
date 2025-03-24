import { FC } from "react";
import { Box } from "@mui/material";

type Props = {
  params: Promise<{ id: string }>;
};

const PreviewProfile: FC<Props> = async (props) => {
  const { params } = props;

  const { id } = await params;

  return <Box>Preview profile page by user id: {id}</Box>;
};

export default PreviewProfile;
