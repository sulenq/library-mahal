import { extendTheme } from "@chakra-ui/react";

export const globalTheme = extendTheme({
  config: {
    initialColorMode: "light",
  },

  colors: {
    p: {
      50: "#E9FFF6",
      100: "#CFFBE9",
      200: "#A0F7DC",
      300: "#6EE8CD",
      400: "#47D1BF",
      500: "#16B3AC",
      600: "#109399",
      700: "#0B7180",
      800: "#075267",
      900: "#043C55",
    },
    ap: {
      50: "#16B3AC1b",
      100: "#16B3AC2b",
      200: "#16B3AC",
      300: "#16B3AC",
      400: "#16B3AC",
      500: "#16B3AC",
      600: "#16B3AC",
      700: "#16B3AC",
      800: "#16B3AC",
      900: "#16B3AC",
    },
    ad: {
      50: "#bfbfbf15",
      100: "#bfbfbf15",
      200: "#bfbfbf15",
      300: "#bfbfbf15",
      400: "#bfbfbf15",
      500: "#bfbfbf15",
      600: "#bfbfbf15",
      700: "#bfbfbf15",
      800: "#bfbfbf15",
      900: "#bfbfbf15",
    },
    ared: {
      50: "#E53E3E1b",
      100: "#E53E3E2b",
      200: "#E53E3E",
      300: "#E53E3E",
      400: "#E53E3E",
      500: "#E53E3E",
      600: "#E53E3E",
      700: "#E53E3E",
      800: "#E53E3E",
      900: "#E53E3E",
    },
    dnw: {
      200: "white",
      300: "white",
      500: "#181818",
      600: "#181818",
    },
    wnd: {
      200: "#181818",
      300: "#181818",
      500: "white",
      600: "white",
    },
    b: "#000000",
    bt: "#333333",
    w: "white",
    wt: "#eeeeee",
    dark: "#181818",
    error: "#E53E3E",
    divider: "#b4b4b420",
    divider2: "#b4b4b440",
    divider3: "#b4b4b450",

    blue: {
      100: "#D0EAFE",
      200: "#A1D2FE",
      300: "#72B5FE",
      400: "#4F9CFD",
      500: "#1672FC",
      600: "#1058D8",
      700: "#0B41B5",
      800: "#072D92",
      900: "#041F78",
    },
  },

  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "dark" : "white",
        color: props.colorMode === "dark" ? "wt" : "bt",
      },
    }),
  },

  components: {
    Skeleton: {
      baseStyle: (props) => ({
        // bg: "var(--divider3) !important",
        borderRadius: "16px",
      }),
    },

    Badge: {
      baseStyle: (props) => ({
        p: "4px 16px",
        borderRadius: 6,
        // textTransform: "none",
      }),
    },

    Drawer: {
      baseStyle: (props) => ({
        dialog: {
          bg: "transparent",
          color: props.colorMode === "dark" ? "wt" : "wt",
          boxShadow: "none",
        },
      }),
    },

    Modal: {
      baseStyle: (props) => ({
        dialogContainer: {
          p: 6,
        },
        dialog: {
          bg: props.colorMode === "dark" ? "dark" : "white",
          color: props.colorMode === "dark" ? "wt" : "bt",
          boxShadow: "none",
          borderRadius: "16px",
          // maxH: "100%",
          // border: "1px solid var(--divider)",
          mx: "16px",
        },
        overlay: {
          bg: "#00000011",
          backdropFilter: "blur(5px)",
        },
        header: {
          py: "20px",
          px: "24px",
          pr: "70px !important",
        },
        body: {
          px: "24px",
          py: "0px !important",
          // minH: window.innerWidth < 500 ? "300px" : "fit-content",
        },
        footer: {
          p: "24px",
        },
        closeButton: {
          borderRadius: "full",
          right: 4,
          top: 4,
          fontSize: "13px !important",
          // color: "red.400",
        },
      }),
    },

    Popover: {
      baseStyle: (props) => ({
        popper: {
          minW: "300px !important",
        },
        content: {
          fontSize: 14,
          // pr: 5,
          bg: props.colorMode === "dark" ? "dark" : "white",
          color: props.colorMode === "dark" ? "white" : "dark",
        },
        body: {
          pr: 8,
        },
        arrow: {
          bg: props.colorMode === "dark" ? "dark !important" : "white",
          color: props.colorMode === "dark" ? "dark" : "white",
        },
        closeButton: {
          right: 1,
          fontSize: "12px !important",
        },
      }),
    },

    Toast: {
      baseStyle: {
        fontSize: [13, null, 15],
        borderRadius: "16px",
      },
    },

    Menu: {
      baseStyle: (props) => ({
        groupTitle: {
          opacity: 0.5,
          cursor: "default",
        },
        divider: {
          my: 0,
        },
        list: {
          bg: props.colorMode === "dark" ? "dark" : "white",
          border: "1px solid var(--divider3)",
          p: 0,
          overflow: "hidden",
          boxShadow: "none",
          borderRadius: "8px",
        },
        item: {
          bg: "transparent",
          _hover: { bg: "var(--divider)" },
          fontSize: 14,
          py: 3,
          px: 4,
        },
      }),
    },

    Button: {
      baseStyle: {
        fontWeight: 550,
        borderRadius: "8px",
      },
      variants: {
        outline: {
          // border: "2px solid",
        },
      },
    },

    Input: {
      baseStyle: (props) => ({
        field: {
          _autofill: {
            boxShadow:
              props.colorMode === "dark"
                ? "0 0 0px 1000px dark inset"
                : "0 0 0px 1000px #ffffff inset",
            border: "2px solid var(--divider) !important",
          },
        },
      }),
    },

    Checkbox: {
      baseStyle: (props) => ({
        icon: {
          color: "white",
        },
        control: {
          border: props.isInvalid
            ? "1.5px solid #E53E3E"
            : "2px solid var(--divider3) !important",
        },
      }),
    },

    Tooltip: {
      baseStyle: {
        bg: "dark",
        color: "w",
        "--popper-arrow-bg": "#0097e8",
        borderRadius: 8,
        px: 4,
        py: 2,
      },
    },

    Table: {
      thead: {
        color: "var(--divider3) !important",
      },
      sizes: {
        md: {
          // th: {
          //   py: "16px",
          //   px: "12px",
          // },
          td: {
            py: "12px",
            px: "16px",
          },
        },
      },
    },
  },
});
