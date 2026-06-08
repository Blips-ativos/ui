# NavigationMenu
**Categoria:** Compound | **Deps:** `@radix-ui/react-navigation-menu`, `class-variance-authority`, `lucide-react` | **"use client":** Não

Exports: NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuTrigger, NavigationMenuLink, NavigationMenuIndicator, NavigationMenuViewport, navigationMenuTriggerStyle

NavigationMenu auto-renders NavigationMenuViewport.

Usage:
```tsx
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, navigationMenuTriggerStyle } from "@blips/ui"

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 w-[400px]">
          <li><NavigationMenuLink href="/docs">Documentation</NavigationMenuLink></li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/about">About</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```
