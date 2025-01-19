import React from "react";
import { Avatar, AvatarGroup, Button, Stack, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// ---------------------------------------------------------------------------------

type AddMemberListProps = {
  members: string[]; 
  onAddClick: () => void; 
};

// ---------------------------------------------------------------------------------

export const AddMemberList: React.FC<AddMemberListProps> = ({
  members,
  onAddClick,
}) => {
  const { palette } = useTheme();

  return (
    <Stack direction="row" spacing={1} alignItems="center">

      <Button
        startIcon={<AddIcon />}
        variant="outlined"
        onClick={onAddClick}
        sx={{
          color: palette.primary.main,
          border: `1px dashed ${palette.primary.main}`,
          textTransform: "none",
          fontSize: "12px", 
          padding: "2px 6px", 
          height: "28px", 
        }}
      >
        Add member
      </Button>

      <AvatarGroup
        max={4}
        sx={{
          "& .MuiAvatar-root": {
            width: "20px", 
            height: "20px", 
            fontSize: "10px", 
          },
        }}
      >
        {members.map((member, index) => (
          <Avatar
            key={index}
            alt={member}
            sx={{
              backgroundColor: palette.primary.light, 
              color: palette.primary.contrastText, 
            }}
          >
            {member[0].toUpperCase()} 
          </Avatar>
        ))}
      </AvatarGroup>
    </Stack>
  );
};
