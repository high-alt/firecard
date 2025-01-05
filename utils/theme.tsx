import 'globals.css'
import { createTheme, darken } from '@mui/material/styles'
import { colours } from '../tailwind.config'
import { Noto_Sans } from 'next/font/google'

const noto = Noto_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-sans',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

declare module '@mui/material/Button' {
	interface ButtonPropsVariantOverrides {
		link: true
		simpleLink: true
	}
}

const theme = createTheme({
  palette: {
    primary: { main: colours.primary.DEFAULT },
    secondary: { main: colours.secondary.DEFAULT },
    text: { primary: colours.black.DEFAULT, secondary: colours.white.DEFAULT },
  },
  typography: {
    fontFamily: noto.style.fontFamily,
  },
  components: {
    MuiButton: {
      defaultProps: { variant: 'contained', color: 'primary' },
      variants: [{
        props: {variant: 'link'},
        style: {
          height: 'auto',
          borderRadius: '32px',
          fontSize: '0.75rem',
          paddingTop: '0.2rem',
          paddingBottom: '0.2rem',
        }},
      ],
      styleOverrides: {
        root: {
          textTransform: 'none',
          height: '44px',
          boxShadow: 'none',
          borderRadius: '8px',
          fontSize: '0.95rem',
          fontWeight: 500,
          ':hover': {
            backgroundColor:darken(colours.primary.DEFAULT, 0.02),
            textDecoration: 'underline',
            textDecorationLine: '1px',
            textDecorationThickness: '1.2px',
            textUnderlineOffset: 3,
          },
        },
        containedPrimary: {
          color: colours.black.DEFAULT,
          ':hover': {},
          ':disabled': {
            color: colours.white.DEFAULT,
            backgroundColor: colours.primary.DEFAULT,
            opacity: 0.9,
          },
        },
        outlinedPrimary: {
          backgroundColor: colours.white.DEFAULT,
          color: colours.black.DEFAULT,
        },
        text: {
          textTransform: 'none',
          fontWeight: 'normal',
          color: colours.charcoal.DEFAULT,
          padding: 0,
          margin: 0,
          fontSize: '0.95rem',
          ':hover': {
            backgroundColor: 'transparent',
            color: colours.black.DEFAULT,
            textDecoration: 'none',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          backgroundColor: 'white',
          borderBottom: '1px solid #00000012',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          border: 'none',
          boxShadow: 'none',
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          '&:focus': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&.MuiInput-root': {
            '&:before': {
              borderBottom: 'none', // Removes the default bottom line
            },
            '&:hover:not(.Mui-disabled):before': {
              borderBottom: 'none', // Removes the hover bottom line
            },
            '&:after': {
              borderBottom: 'none', // Removes the focus bottom line
            },
            '&:focus': {
              outline: 'none',
              boxShadow: 'none', // Ensures no outline or shadow on focus
            },
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: colours.black.DEFAULT,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: colours.black.light,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          ':hover': {
            color: 'black',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {},
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: colours.black.light,
        },
      },
    },
    MuiIcon: {
      defaultProps: {
        // Replace the `material-icons` default value.
        baseClassName: 'material-icons-outlined',
      },
    },
  },
})

export default theme
