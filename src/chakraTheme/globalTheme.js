import { extendTheme } from "@chakra-ui/react";

export const globalTheme = extendTheme({
  config: {
    initialColorMode: "light",
  },

  colors: {
    p: {
      50: "#d7f3ff",
      100: "#b9ecff",
      200: "#88e2ff",
      300: "#50cfff",
      400: "#28b3ff",
      500: "#0693ff",
      600: "#0a7eeb",
      700: "#0f64be",
      800: "#135695",
      900: "#11345a",
    },
    ap: {
      50: "#0693ff1b",
      100: "#0693ff2b",
      200: "#0693ff",
      300: "#0693ff",
      400: "#0693ff",
      500: "#0693ff",
      600: "#0693ff",
      700: "#0693ff",
      800: "#0693ff",
      900: "#0693ff",
    },
    bnw: {
      200: "white",
      300: "white",
      500: "#191919",
      600: "#191919",
    },
    wnb: {
      200: "#191919",
      300: "#191919",
      500: "white",
      600: "white",
    },
    dark: "#191919",
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
    Accordion: {
      baseStyle: (props) => ({
        container: {
          borderColor: "var(--divider)",
        },
      }),
    },

    Alert: {
      baseStyle: (props) => ({
        container: {
          borderRadius: 12,
        },
      }),
      variants: {
        // Perbarui varian subtle untuk status error
        subtle: (props) => ({
          container: {
            bg: props.status === "error" ? "var(--reda3)" : undefined,
          },
          icon: {
            color: props.status === "error" ? "red.400" : undefined,
          },
        }),
      },
    },

    Badge: {
      baseStyle: (props) => ({
        p: "4px 16px",
        borderRadius: 8,
        // textTransform: "none",
      }),
    },

    Button: {
      baseStyle: {
        fontWeight: 550,
        borderRadius: 8,
      },
      variants: {
        outline: {
          // border: "2px solid",
        },
      },
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

    Drawer: {
      baseStyle: (props) => ({
        dialog: {
          bg: props.colorMode === "dark" ? "dark" : "white",
          boxShadow: "none",
        },
        body: {
          px: "24px",
          py: "0px !important",
          display: "flex",
          flexDirection: "column",
          // minH: window.innerWidth < 500 ? "300px" : "fit-content",
        },
        closeButton: {
          borderRadius: "full",
          right: 4,
          top: 4,
          fontSize: "13px !important",
        },
      }),
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
          borderRadius: 8,
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

    Modal: {
      baseStyle: (props) => ({
        dialogContainer: {
          // p: 6,
        },
        dialog: {
          bg: props.colorMode === "dark" ? "dark" : "white",
          color: props.colorMode === "dark" ? "wt" : "bt",
          boxShadow: "none",
          borderRadius: 12,
          // maxH: "100%",
          // border: "1px solid var(--divider)",
          // mx: "16px",
        },
        overlay: {
          bg: "#00000011",
          backdropFilter: "blur(5px)",
        },
        header: {
          py: "20px",
          pt: "16px",
          px: "24px",
          // pr: "70px !important",
        },
        body: {
          px: "24px",
          py: "0px !important",
          display: "flex",
          flexDirection: "column",
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

    Radio: {
      baseStyle: (props) => ({
        control: {
          border: "1px solid var(--divider3) !important",
        },
      }),
    },

    Skeleton: {
      baseStyle: (props) => ({
        // bg: "var(--divider3) !important",
        borderRadius: 8,
      }),
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

    Toast: {
      baseStyle: {
        fontSize: [13, null, 15],
        borderRadius: 8,
      },
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
  },
});
