import * as React from "react";

interface SidebarContextType {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    state: string;
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);

interface SidebarProviderProps {
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export function SidebarProvider({ children, defaultOpen = true }: SidebarProviderProps) {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    return (
        <SidebarContext.Provider value={{ isOpen, setIsOpen, state: isOpen ? 'open' : 'closed' }}>
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const context = React.useContext(SidebarContext);
    if (context === undefined) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}

// Sidebar Components
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    collapsible?: string;
    variant?: string;
}

export const Sidebar = React.forwardRef<
    HTMLDivElement,
    SidebarProps
>(({ className, children, /* collapsible, variant, */ ...props }, ref) => (
    <div
        ref={ref}
        className={`flex h-full w-64 flex-col bg-sidebar border-r ${className || ''}`}
        {...props}
    >
        {children}
    </div>
));
Sidebar.displayName = "Sidebar";

export const SidebarContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={`flex-1 overflow-y-auto ${className || ''}`}
        {...props}
    />
));
SidebarContent.displayName = "SidebarContent";

export const SidebarHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={`p-4 border-b ${className || ''}`}
        {...props}
    />
));
SidebarHeader.displayName = "SidebarHeader";

export const SidebarFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={`p-4 border-t ${className || ''}`}
        {...props}
    />
));
SidebarFooter.displayName = "SidebarFooter";

export const SidebarInset = React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
    <main
        ref={ref}
        className={`flex-1 ${className || ''}`}
        {...props}
    />
));
SidebarInset.displayName = "SidebarInset";

export const SidebarGroup = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={`mb-4 ${className || ''}`}
        {...props}
    />
));
SidebarGroup.displayName = "SidebarGroup";

export const SidebarGroupLabel = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={`px-4 py-2 text-sm font-semibold text-muted-foreground ${className || ''}`}
        {...props}
    />
));
SidebarGroupLabel.displayName = "SidebarGroupLabel";

export const SidebarGroupContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={`${className || ''}`}
        {...props}
    />
));
SidebarGroupContent.displayName = "SidebarGroupContent";

export const SidebarMenu = React.forwardRef<
    HTMLUListElement,
    React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={`space-y-1 ${className || ''}`}
        {...props}
    />
));
SidebarMenu.displayName = "SidebarMenu";

export const SidebarMenuItem = React.forwardRef<
    HTMLLIElement,
    React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
    <li
        ref={ref}
        className={`${className || ''}`}
        {...props}
    />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    size?: string;
    isActive?: boolean;
    tooltip?: {
        children: React.ReactNode;
    };
}

export const SidebarMenuButton = React.forwardRef<
    HTMLButtonElement,
    SidebarMenuButtonProps
>(({ className, /* asChild, size, isActive, tooltip, */ ...props }, ref) => (
    <button
        ref={ref}
        className={`w-full px-4 py-2 text-left hover:bg-accent hover:text-accent-foreground rounded-md ${className || ''}`}
        {...props}
    />
));
SidebarMenuButton.displayName = "SidebarMenuButton";

export const SidebarTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
    <button
        ref={ref}
        className={`p-2 ${className || ''}`}
        {...props}
    />
));
SidebarTrigger.displayName = "SidebarTrigger";