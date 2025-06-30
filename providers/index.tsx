'use client'
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ThemeProvider } from "next-themes";

export default function Provider({children}:{children:React.ReactNode}){
    return (
        <ThemeProvider
            attribute={"class"}
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
            <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
    )
}