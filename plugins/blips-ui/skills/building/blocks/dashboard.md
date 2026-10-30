# Dashboard

## Overview

The `dashboard-01` block is a full dashboard layout combining an inset sidebar, interactive area chart, metric cards, and a sortable data table with drag-and-drop support. It demonstrates the composition of multiple shadcn/ui primitives into a complete admin interface.

> **Versão da lib:** o código abaixo está na **v3.x — Base UI** (imports `@blips/ui/components/*`,
> ícones Phosphor `*Icon`, `render`, `data-popup-open`, `ToggleGroup` com array, `Drawer` do
> Base UI, `Select` com `items`, recharts 3). Para repo **v2.x — Radix**, veja só as diferenças
> em [v2.x — Radix](#v2x--radix) no fim. Detecção de versão: Passo 0 do `SKILL.md` do building.
>
> Os componentes locais do bloco (`AppSidebar`, `DataTable`, `NavMain`…) moram no app
> (`@/components/*`); só as primitivas vêm da `@blips/ui`.

**Type:** registry:block
**Files:** 11 files
**Dependencies:** @blips/ui, @dnd-kit/core, @dnd-kit/modifiers, @dnd-kit/sortable, @dnd-kit/utilities, @phosphor-icons/react, @tanstack/react-table, recharts (3 na v3.x, 2 na v2.x), sonner, zod

## Structure

```
dashboard-01/
  page.tsx                        # Root layout: SidebarProvider + SidebarInset
  data.json                       # Sample table data
  components/
    app-sidebar.tsx               # Inset sidebar with nav groups + user menu
    chart-area-interactive.tsx    # Interactive area chart with time range filter
    data-table.tsx               # Sortable data table with DnD, pagination, filters
    nav-documents.tsx            # Document links sidebar group
    nav-main.tsx                 # Primary navigation sidebar group
    nav-secondary.tsx            # Secondary navigation sidebar group (bottom)
    nav-user.tsx                 # User dropdown in sidebar footer
    section-cards.tsx            # Metric cards grid (revenue, customers, etc.)
    site-header.tsx              # Sticky header with sidebar trigger
```

### Component Composition Tree

```
SidebarProvider (--sidebar-width, --header-height CSS vars)
  AppSidebar (variant="inset", collapsible="offcanvas")
    SidebarHeader > Logo
    SidebarContent
      NavMain (Quick Create + nav items)
      NavDocuments (document links with dropdown actions)
      NavSecondary (settings, help, search - mt-auto)
    SidebarFooter > NavUser (avatar + dropdown)
  SidebarInset
    SiteHeader (SidebarTrigger + breadcrumb)
    @container/main
      SectionCards (4-col responsive grid of Card metrics)
      ChartAreaInteractive (AreaChart + time range ToggleGroup/Select)
      DataTable (Tabs + DnD table + pagination)
```

## Code

### Code (page.tsx):

```tsx
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@blips/ui/components/sidebar"

import data from "./data.json"

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

```
### Code (data.json):

```tsx
[
  {
    "id": 1,
    "header": "Cover page",
    "type": "Cover page",
    "status": "In Process",
    "target": "18",
    "limit": "5",
    "reviewer": "Eddie Lake"
  },
  {
    "id": 2,
    "header": "Table of contents",
    "type": "Table of contents",
    "status": "Done",
    "target": "29",
    "limit": "24",
    "reviewer": "Eddie Lake"
  },
  {
    "id": 3,
    "header": "Executive summary",
    "type": "Narrative",
    "status": "Done",
    "target": "10",
    "limit": "13",
    "reviewer": "Eddie Lake"
  },
  {
    "id": 4,
    "header": "Technical approach",
    "type": "Narrative",
    "status": "Done",
    "target": "27",
    "limit": "23",
    "reviewer": "Jamik Tashpulatov"
  },
  {
    "id": 5,
    "header": "Design",
    "type": "Narrative",
    "status": "In Process",
    "target": "2",
    "limit": "16",
    "reviewer": "Jamik Tashpulatov"
  },
  {
    "id": 6,
    "header": "Capabilities",
    "type": "Narrative",
    "status": "In Process",
    "target": "20",
    "limit": "8",
    "reviewer": "Jamik Tashpulatov"
  },
  {
    "id": 7,
    "header": "Integration with existing systems",
    "type": "Narrative",
    "status": "In Process",
    "target": "19",
    "limit": "21",
    "reviewer": "Jamik Tashpulatov"
  },
  {
    "id": 8,
    "header": "Innovation and Advantages",
    "type": "Narrative",
    "status": "Done",
    "target": "25",
    "limit": "26",
    "reviewer": "Assign reviewer"
  },
  {
    "id": 9,
    "header": "Overview of EMR's Innovative Solutions",
    "type": "Technical content",
    "status": "Done",
    "target": "7",
    "limit": "23",
    "reviewer": "Assign reviewer"
  },
  {
    "id": 10,
    "header": "Advanced Algorithms and Machine Learning",
    "type": "Narrative",
    "status": "Done",
    "target": "30",
    "limit": "28",
    "reviewer": "Assign reviewer"
  },
  {
    "id": 11,
    "header": "Adaptive Communication Protocols",
    "type": "Narrative",
    "status": "Done",
    "target": "9",
    "limit": "31",
    "reviewer": "Assign reviewer"
  },
  {
    "id": 12,
    "header": "Advantages Over Current Technologies",
    "type": "Narrative",
    "status": "Done",
    "target": "12",
    "limit": "0",
    "reviewer": "Assign reviewer"
  },
  {
    "id": 13,
    "header": "Past Performance",
    "type": "Narrative",
    "status": "Done",
    "target": "22",
    "limit": "33",
    "reviewer": "Assign reviewer"
  },
  {
    "id": 14,
    "header": "Customer Feedback and Satisfaction Levels",
    "type": "Narrative",
    "status": "Done",
    "target": "15",
    "limit": "34",
    "reviewer": "Assign reviewer"
  },
  {
    "id": 15,
    "header": "Implementation Challenges and Solutions",
    "type": "Narrative",
    "status": "Done",
    "target": "3",
    "limit": "35",
    "reviewer": "Assign reviewer"
  },
  {
    "id": 16,
    "header": "Security Measures and Data Protection Policies",
    "type": "Narrative",
    "status": "In Process",
    "target": "6",
    "limit": "36",
    "reviewer": "Assign reviewer"
  },
  {
    "id": 17,
    "header": "Scalability and Future Proofing",
    "type": "Narrative",
    "status": "Done",
    "target": "4",
    "limit": "37",
    "reviewer": "Assign reviewer"
  },
  {
    "id": 18,
    "header": "Cost-Benefit Analysis",
    "type": "Plain language",
    "status": "Done",
    "target": "14",
    "limit": "38",
    "reviewer": "Assign reviewer"
  },
  {
    "id": 19,
    "header": "User Training and Onboarding Experience",
    "type": "Narrative",
    "status": "Done",
    "target": "17",
    "limit": "39",
    "reviewer": "Assign reviewer"
  },
  {
    "id": 20,
    "header": "Future Development Roadmap",
    "type": "Narrative",
    "status": "Done",
    "target": "11",
    "limit": "40",
    "reviewer": "Assign reviewer"
  },
  {
    "id": 21,
    "header": "System Architecture Overview",
    "type": "Technical content",
    "status": "In Process",
    "target": "24",
    "limit": "18",
    "reviewer": "Maya Johnson"
  },
  {
    "id": 22,
    "header": "Risk Management Plan",
    "type": "Narrative",
    "status": "Done",
    "target": "15",
    "limit": "22",
    "reviewer": "Carlos Rodriguez"
  },
  {
    "id": 23,
    "header": "Compliance Documentation",
    "type": "Legal",
    "status": "In Process",
    "target": "31",
    "limit": "27",
    "reviewer": "Sarah Chen"
  },
  {
    "id": 24,
    "header": "API Documentation",
    "type": "Technical content",
    "status": "Done",
    "target": "8",
    "limit": "12",
    "reviewer": "Raj Patel"
  },
  {
    "id": 25,
    "header": "User Interface Mockups",
    "type": "Visual",
    "status": "In Process",
    "target": "19",
    "limit": "25",
    "reviewer": "Leila Ahmadi"
  },
  {
    "id": 26,
    "header": "Database Schema",
    "type": "Technical content",
    "status": "Done",
    "target": "22",
    "limit": "20",
    "reviewer": "Thomas Wilson"
  },
  {
    "id": 27,
    "header": "Testing Methodology",
    "type": "Technical content",
    "status": "In Process",
    "target": "17",
    "limit": "14",
    "reviewer": "Assign reviewer"
  },
  {
    "id": 28,
    "header": "Deployment Strategy",
    "type": "Narrative",
    "status": "Done",
    "target": "26",
    "limit": "30",
    "reviewer": "Eddie Lake"
  },
  {
    "id": 29,
    "header": "Budget Breakdown",
    "type": "Financial",
    "status": "In Process",
    "target": "13",
    "limit": "16",
    "reviewer": "Jamik Tashpulatov"
  },
  {
    "id": 30,
    "header": "Market Analysis",
    "type": "Research",
    "status": "Done",
    "target": "29",
    "limit": "32",
    "reviewer": "Sophia Martinez"
  },
  {
    "id": 31,
    "header": "Competitor Comparison",
    "type": "Research",
    "status": "In Process",
    "target": "21",
    "limit": "19",
    "reviewer": "Assign reviewer"
  },
  {
    "id": 32,
    "header": "Maintenance Plan",
    "type": "Technical content",
    "status": "Done",
    "target": "16",
    "limit": "23",
    "reviewer": "Alex Thompson"
  },
  {
    "id": 33,
    "header": "User Personas",
    "type": "Research",
    "status": "In Process",
    "target": "27",
    "limit": "24",
    "reviewer": "Nina Patel"
  },
  {
    "id": 34,
    "header": "Accessibility Compliance",
    "type": "Legal",
    "status": "Done",
    "target": "18",
    "limit": "21",
    "reviewer": "Assign reviewer"
  },
  {
    "id": 35,
    "header": "Performance Metrics",
    "type": "Technical content",
    "status": "In Process",
    "target": "23",
    "limit": "26",
    "reviewer": "David Kim"
  },
  {
    "id": 36,
    "header": "Disaster Recovery Plan",
    "type": "Technical content",
    "status": "Done",
    "target": "14",
    "limit": "17",
    "reviewer": "Jamik Tashpulatov"
  },
  {
    "id": 37,
    "header": "Third-party Integrations",
    "type": "Technical content",
    "status": "In Process",
    "target": "25",
    "limit": "28",
    "reviewer": "Eddie Lake"
  },
  {
    "id": 38,
    "header": "User Feedback Summary",
    "type": "Research",
    "status": "Done",
    "target": "20",
    "limit": "15",
    "reviewer": "Assign reviewer"
  },
  {
    "id": 39,
    "header": "Localization Strategy",
    "type": "Narrative",
    "status": "In Process",
    "target": "12",
    "limit": "19",
    "reviewer": "Maria Garcia"
  },
  {
    "id": 40,
    "header": "Mobile Compatibility",
    "type": "Technical content",
    "status": "Done",
    "target": "28",
    "limit": "31",
    "reviewer": "James Wilson"
  },
  {
    "id": 41,
    "header": "Data Migration Plan",
    "type": "Technical content",
    "status": "In Process",
    "target": "19",
    "limit": "22",
    "reviewer": "Assign reviewer"
  },
  {
    "id": 42,
    "header": "Quality Assurance Protocols",
    "type": "Technical content",
    "status": "Done",
    "target": "30",
    "limit": "33",
    "reviewer": "Priya Singh"
  },
  {
    "id": 43,
    "header": "Stakeholder Analysis",
    "type": "Research",
    "status": "In Process",
    "target": "11",
    "limit": "14",
    "reviewer": "Eddie Lake"
  },
  {
    "id": 44,
    "header": "Environmental Impact Assessment",
    "type": "Research",
    "status": "Done",
    "target": "24",
    "limit": "27",
    "reviewer": "Assign reviewer"
  },
  {
    "id": 45,
    "header": "Intellectual Property Rights",
    "type": "Legal",
    "status": "In Process",
    "target": "17",
    "limit": "20",
    "reviewer": "Sarah Johnson"
  },
  {
    "id": 46,
    "header": "Customer Support Framework",
    "type": "Narrative",
    "status": "Done",
    "target": "22",
    "limit": "25",
    "reviewer": "Jamik Tashpulatov"
  },
  {
    "id": 47,
    "header": "Version Control Strategy",
    "type": "Technical content",
    "status": "In Process",
    "target": "15",
    "limit": "18",
    "reviewer": "Assign reviewer"
  },
  {
    "id": 48,
    "header": "Continuous Integration Pipeline",
    "type": "Technical content",
    "status": "Done",
    "target": "26",
    "limit": "29",
    "reviewer": "Michael Chen"
  },
  {
    "id": 49,
    "header": "Regulatory Compliance",
    "type": "Legal",
    "status": "In Process",
    "target": "13",
    "limit": "16",
    "reviewer": "Assign reviewer"
  },
  {
    "id": 50,
    "header": "User Authentication System",
    "type": "Technical content",
    "status": "Done",
    "target": "28",
    "limit": "31",
    "reviewer": "Eddie Lake"
  },
  {
    "id": 51,
    "header": "Data Analytics Framework",
    "type": "Technical content",
    "status": "In Process",
    "target": "21",
    "limit": "24",
    "reviewer": "Jamik Tashpulatov"
  },
  {
    "id": 52,
    "header": "Cloud Infrastructure",
    "type": "Technical content",
    "status": "Done",
    "target": "16",
    "limit": "19",
    "reviewer": "Assign reviewer"
  },
  {
    "id": 53,
    "header": "Network Security Measures",
    "type": "Technical content",
    "status": "In Process",
    "target": "29",
    "limit": "32",
    "reviewer": "Lisa Wong"
  },
  {
    "id": 54,
    "header": "Project Timeline",
    "type": "Planning",
    "status": "Done",
    "target": "14",
    "limit": "17",
    "reviewer": "Eddie Lake"
  },
  {
    "id": 55,
    "header": "Resource Allocation",
    "type": "Planning",
    "status": "In Process",
    "target": "27",
    "limit": "30",
    "reviewer": "Assign reviewer"
  },
  {
    "id": 56,
    "header": "Team Structure and Roles",
    "type": "Planning",
    "status": "Done",
    "target": "20",
    "limit": "23",
    "reviewer": "Jamik Tashpulatov"
  },
  {
    "id": 57,
    "header": "Communication Protocols",
    "type": "Planning",
    "status": "In Process",
    "target": "15",
    "limit": "18",
    "reviewer": "Assign reviewer"
  },
  {
    "id": 58,
    "header": "Success Metrics",
    "type": "Planning",
    "status": "Done",
    "target": "30",
    "limit": "33",
    "reviewer": "Eddie Lake"
  },
  {
    "id": 59,
    "header": "Internationalization Support",
    "type": "Technical content",
    "status": "In Process",
    "target": "23",
    "limit": "26",
    "reviewer": "Jamik Tashpulatov"
  },
  {
    "id": 60,
    "header": "Backup and Recovery Procedures",
    "type": "Technical content",
    "status": "Done",
    "target": "18",
    "limit": "21",
    "reviewer": "Assign reviewer"
  },
  {
    "id": 61,
    "header": "Monitoring and Alerting System",
    "type": "Technical content",
    "status": "In Process",
    "target": "25",
    "limit": "28",
    "reviewer": "Daniel Park"
  },
  {
    "id": 62,
    "header": "Code Review Guidelines",
    "type": "Technical content",
    "status": "Done",
    "target": "12",
    "limit": "15",
    "reviewer": "Eddie Lake"
  },
  {
    "id": 63,
    "header": "Documentation Standards",
    "type": "Technical content",
    "status": "In Process",
    "target": "27",
    "limit": "30",
    "reviewer": "Jamik Tashpulatov"
  },
  {
    "id": 64,
    "header": "Release Management Process",
    "type": "Planning",
    "status": "Done",
    "target": "22",
    "limit": "25",
    "reviewer": "Assign reviewer"
  },
  {
    "id": 65,
    "header": "Feature Prioritization Matrix",
    "type": "Planning",
    "status": "In Process",
    "target": "19",
    "limit": "22",
    "reviewer": "Emma Davis"
  },
  {
    "id": 66,
    "header": "Technical Debt Assessment",
    "type": "Technical content",
    "status": "Done",
    "target": "24",
    "limit": "27",
    "reviewer": "Eddie Lake"
  },
  {
    "id": 67,
    "header": "Capacity Planning",
    "type": "Planning",
    "status": "In Process",
    "target": "21",
    "limit": "24",
    "reviewer": "Jamik Tashpulatov"
  },
  {
    "id": 68,
    "header": "Service Level Agreements",
    "type": "Legal",
    "status": "Done",
    "target": "26",
    "limit": "29",
    "reviewer": "Assign reviewer"
  }
]

```
### Code (components/app-sidebar.tsx):

```tsx
"use client"

import * as React from "react"
import {
  CameraIcon,
  ChartBarIcon,
  SquaresFourIcon,
  DatabaseIcon,
  SparkleIcon,
  FileTextIcon,
  FileDocIcon,
  FolderIcon,
  QuestionIcon,
  CircleHalfIcon,
  ListBulletsIcon,
  ClipboardTextIcon,
  MagnifyingGlassIcon,
  GearIcon,
  UsersIcon,
} from "@phosphor-icons/react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@blips/ui/components/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquaresFourIcon,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: ListBulletsIcon,
    },
    {
      title: "Analytics",
      url: "#",
      icon: ChartBarIcon,
    },
    {
      title: "Projects",
      url: "#",
      icon: FolderIcon,
    },
    {
      title: "Team",
      url: "#",
      icon: UsersIcon,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: CameraIcon,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: FileTextIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: SparkleIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: GearIcon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: QuestionIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: MagnifyingGlassIcon,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: DatabaseIcon,
    },
    {
      name: "Reports",
      url: "#",
      icon: ClipboardTextIcon,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: FileDocIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="#" />}
            >
              <CircleHalfIcon className="size-5!" />
              <span className="text-base font-semibold">Acme Inc.</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

```
### Code (components/chart-area-interactive.tsx):

```tsx
"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@blips/ui/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@blips/ui/components/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@blips/ui/components/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@blips/ui/components/toggle-group"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Visitors</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          {/* v3.x: value é sempre array; seleção única é o default */}
          <ToggleGroup
            value={[timeRange]}
            onValueChange={(value) => value[0] && setTimeRange(value[0])}
            variant="outline"
            spacing={0}
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select
            items={{ "90d": "Last 3 months", "30d": "Last 30 days", "7d": "Last 7 days" }}
            value={timeRange}
            onValueChange={(value) => value && setTimeRange(value)}
          >
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

```
### Code (components/data-table.tsx):

```tsx
"use client"

import * as React from "react"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
  CheckCircleIcon,
  DotsThreeVerticalIcon,
  DotsSixVerticalIcon,
  ColumnsIcon,
  SpinnerIcon,
  PlusIcon,
  TrendUpIcon,
} from "@phosphor-icons/react"
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { toast } from "sonner"
import { z } from "zod"

import { useIsMobile } from "@blips/ui/hooks/use-mobile"
import { Badge } from "@blips/ui/components/badge"
import { Button } from "@blips/ui/components/button"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@blips/ui/components/chart"
import { Checkbox } from "@blips/ui/components/checkbox"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@blips/ui/components/drawer"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu"
import { Input } from "@blips/ui/components/input"
import { Label } from "@blips/ui/components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@blips/ui/components/select"
import { Separator } from "@blips/ui/components/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@blips/ui/components/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@blips/ui/components/tabs"

export const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
})

// Create a separate component for the drag handle
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  })

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 text-muted-foreground hover:bg-transparent"
    >
      <DotsSixVerticalIcon className="size-3 text-muted-foreground" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  )
}

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={
            table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "header",
    header: "Header",
    cell: ({ row }) => {
      return <TableCellViewer item={row.original} />
    },
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: "Section Type",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="px-1.5 text-muted-foreground">
          {row.original.type}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="px-1.5 text-muted-foreground">
        {row.original.status === "Done" ? (
          <CheckCircleIcon className="fill-green-500 dark:fill-green-400" />
        ) : (
          <SpinnerIcon />
        )}
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "target",
    header: () => <div className="w-full text-right">Target</div>,
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Saving ${row.original.header}`,
            success: "Done",
            error: "Error",
          })
        }}
      >
        <Label htmlFor={`${row.original.id}-target`} className="sr-only">
          Target
        </Label>
        <Input
          className="h-8 w-16 border-transparent bg-transparent text-right shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background dark:bg-transparent dark:hover:bg-input/30 dark:focus-visible:bg-input/30"
          defaultValue={row.original.target}
          id={`${row.original.id}-target`}
        />
      </form>
    ),
  },
  {
    accessorKey: "limit",
    header: () => <div className="w-full text-right">Limit</div>,
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Saving ${row.original.header}`,
            success: "Done",
            error: "Error",
          })
        }}
      >
        <Label htmlFor={`${row.original.id}-limit`} className="sr-only">
          Limit
        </Label>
        <Input
          className="h-8 w-16 border-transparent bg-transparent text-right shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background dark:bg-transparent dark:hover:bg-input/30 dark:focus-visible:bg-input/30"
          defaultValue={row.original.limit}
          id={`${row.original.id}-limit`}
        />
      </form>
    ),
  },
  {
    accessorKey: "reviewer",
    header: "Reviewer",
    cell: ({ row }) => {
      const isAssigned = row.original.reviewer !== "Assign reviewer"

      if (isAssigned) {
        return row.original.reviewer
      }

      return (
        <>
          <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
            Reviewer
          </Label>
          <Select>
            <SelectTrigger
              className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
              size="sm"
              id={`${row.original.id}-reviewer`}
            >
              <SelectValue placeholder="Assign reviewer" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
              <SelectItem value="Jamik Tashpulatov">
                Jamik Tashpulatov
              </SelectItem>
            </SelectContent>
          </Select>
        </>
      )
    },
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              className="flex size-8 text-muted-foreground data-popup-open:bg-muted"
              size="icon"
            />
          }
        >
          <DotsThreeVerticalIcon />
          <span className="sr-only">Open menu</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

export function DataTable({
  data: initialData,
}: {
  data: z.infer<typeof schema>[]
}) {
  const [data, setData] = React.useState(() => initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }

  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select
          items={{
            outline: "Outline",
            "past-performance": "Past Performance",
            "key-personnel": "Key Personnel",
            "focus-documents": "Focus Documents",
          }}
          defaultValue="outline"
        >
          <SelectTrigger
            className="flex w-fit @4xl/main:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="outline">Outline</SelectItem>
            <SelectItem value="past-performance">Past Performance</SelectItem>
            <SelectItem value="key-personnel">Key Personnel</SelectItem>
            <SelectItem value="focus-documents">Focus Documents</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="outline">Outline</TabsTrigger>
          <TabsTrigger value="past-performance">
            Past Performance <Badge variant="secondary">3</Badge>
          </TabsTrigger>
          <TabsTrigger value="key-personnel">
            Key Personnel <Badge variant="secondary">2</Badge>
          </TabsTrigger>
          <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
              <ColumnsIcon />
              <span className="hidden lg:inline">Customize Columns</span>
              <span className="lg:hidden">Columns</span>
              <CaretDownIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm">
            <PlusIcon />
            <span className="hidden lg:inline">Add Section</span>
          </Button>
        </div>
      </div>
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-muted">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <div className="flex items-center justify-between px-4">
          <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <CaretDoubleLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <CaretLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <CaretRightIcon />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <CaretDoubleRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        value="past-performance"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent
        value="focus-documents"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
    </Tabs>
  )
}

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
} satisfies ChartConfig

function TableCellViewer({ item }: { item: z.infer<typeof schema> }) {
  const isMobile = useIsMobile()

  return (
    <Drawer swipeDirection={isMobile ? "down" : "right"}>
      <DrawerTrigger
        render={<Button variant="link" className="w-fit px-0 text-left text-foreground" />}
      >
        {item.header}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.header}</DrawerTitle>
          <DrawerDescription>
            Showing total visitors for the last 6 months
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {!isMobile && (
            <>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 10,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.6}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
              <Separator />
              <div className="grid gap-2">
                <div className="flex gap-2 leading-none font-medium">
                  Trending up by 5.2% this month{" "}
                  <TrendUpIcon className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  Showing total visitors for the last 6 months. This is just
                  some random text to test the layout. It spans multiple lines
                  and should wrap around.
                </div>
              </div>
              <Separator />
            </>
          )}
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Header</Label>
              <Input id="header" defaultValue={item.header} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="type">Type</Label>
                <Select defaultValue={item.type}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Table of Contents">
                      Table of Contents
                    </SelectItem>
                    <SelectItem value="Executive Summary">
                      Executive Summary
                    </SelectItem>
                    <SelectItem value="Technical Approach">
                      Technical Approach
                    </SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Capabilities">Capabilities</SelectItem>
                    <SelectItem value="Focus Documents">
                      Focus Documents
                    </SelectItem>
                    <SelectItem value="Narrative">Narrative</SelectItem>
                    <SelectItem value="Cover Page">Cover Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={item.status}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Done">Done</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="target">Target</Label>
                <Input id="target" defaultValue={item.target} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="limit">Limit</Label>
                <Input id="limit" defaultValue={item.limit} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="reviewer">Reviewer</Label>
              <Select defaultValue={item.reviewer}>
                <SelectTrigger id="reviewer" className="w-full">
                  <SelectValue placeholder="Select a reviewer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                  <SelectItem value="Jamik Tashpulatov">
                    Jamik Tashpulatov
                  </SelectItem>
                  <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose render={<Button variant="outline" />}>Done</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

```
### Code (components/nav-documents.tsx):

```tsx
"use client"

import {
  DotsThreeIcon,
  FolderIcon,
  ShareIcon,
  TrashIcon,
  type Icon,
} from "@phosphor-icons/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@blips/ui/components/sidebar"

export function NavDocuments({
  items,
}: {
  items: {
    name: string
    url: string
    icon: Icon
  }[]
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Documents</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton render={<a href={item.url} />}>
              <item.icon />
              <span>{item.name}</span>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuAction
                    showOnHover
                    className="rounded-sm data-popup-open:bg-accent"
                  />
                }
              >
                <DotsThreeIcon />
                <span className="sr-only">More</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-24 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <FolderIcon />
                  <span>Open</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ShareIcon />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <TrashIcon />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <DotsThreeIcon className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

```
### Code (components/nav-main.tsx):

```tsx
"use client"

import { PlusCircleIcon, EnvelopeIcon, type Icon } from "@phosphor-icons/react"

import { Button } from "@blips/ui/components/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@blips/ui/components/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
            >
              <PlusCircleIcon />
              <span>Quick Create</span>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <EnvelopeIcon />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

```
### Code (components/nav-secondary.tsx):

```tsx
"use client"

import * as React from "react"
import { type Icon } from "@phosphor-icons/react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@blips/ui/components/sidebar"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: Icon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton render={<a href={item.url} />}>
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

```
### Code (components/nav-user.tsx):

```tsx
"use client"

import {
  CreditCardIcon,
  DotsThreeVerticalIcon,
  SignOutIcon,
  BellIcon,
  UserCircleIcon,
} from "@phosphor-icons/react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@blips/ui/components/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@blips/ui/components/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@blips/ui/components/sidebar"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
              />
            }
          >
            <Avatar className="h-8 w-8 rounded-lg grayscale">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
            <DotsThreeVerticalIcon className="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--anchor-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserCircleIcon />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCardIcon />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BellIcon />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

```
### Code (components/section-cards.tsx):

```tsx
import { TrendDownIcon, TrendUpIcon } from "@phosphor-icons/react"

import { Badge } from "@blips/ui/components/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@blips/ui/components/card"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $1,250.00
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendUpIcon />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <TrendUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>New Customers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1,234
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendDownIcon />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <TrendDownIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Accounts</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            45,678
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendUpIcon />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention <TrendUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4.5%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendUpIcon />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance increase <TrendUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  )
}

```
### Code (components/site-header.tsx):

```tsx
import { Button } from "@blips/ui/components/button"
import { Separator } from "@blips/ui/components/separator"
import { SidebarTrigger } from "@blips/ui/components/sidebar"

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Documents</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:flex"
            nativeButton={false}
            render={
              <a
                href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
                rel="noopener noreferrer"
                target="_blank"
                className="dark:text-foreground"
              />
            }
          >
            GitHub
          </Button>
        </div>
      </div>
    </header>
  )
}

```

---

## v2.x — Radix

O bloco vale para a v2.x trocando só estes pontos:

| Arquivo / trecho | v3.x — Base UI (acima) | v2.x — Radix |
|---|---|---|
| Ícones | `CaretDownIcon`, `DotsThreeVerticalIcon`… | os mesmos nomes funcionam (Phosphor 2.1.10); `CaretDown` sem sufixo também |
| Triggers (`DropdownMenuTrigger`, `DrawerTrigger`, `DrawerClose`) | `render={<Button … />}` | `asChild` + `<Button>` filho |
| Item da sidebar como link (`nav-*.tsx`) | `<SidebarMenuButton render={<a href={item.url} />}>` | `<SidebarMenuButton asChild><a href={item.url}>…</a></SidebarMenuButton>` |
| Trigger aberto (`nav-user`, `nav-documents`, ações da tabela) | `data-popup-open:bg-sidebar-accent` / `data-popup-open:bg-accent` / `data-popup-open:bg-muted` | `data-[state=open]:bg-sidebar-accent` / `data-[state=open]:bg-accent` / `data-[state=open]:bg-muted` |
| Largura do menu do usuário | `w-(--anchor-width)` | `w-(--radix-dropdown-menu-trigger-width)` |
| `DropdownMenuLabel` (`nav-user`) | dentro de `DropdownMenuGroup` | solto |
| Checkbox "select all" | `checked={all}` + `indeterminate={some && !all}` | `checked={all \|\| (some && "indeterminate")}` |
| `ToggleGroup` do gráfico | `value={[timeRange]}`, `onValueChange={(v) => v[0] && setTimeRange(v[0])}`, `spacing={0}` | `type="single" value={timeRange} onValueChange={setTimeRange}` |
| `Select` com rótulo ≠ `value` (time range, view selector) | `items={{ "90d": "Last 3 months", … }}` e `onValueChange={(v) => v && setX(v)}` | sem `items`; `onValueChange={setX}` |
| `Drawer` (`TableCellViewer`) | `<Drawer swipeDirection={isMobile ? "down" : "right"}>`; alça opt-in (`showSwipeHandle`) | `<Drawer direction={isMobile ? "bottom" : "right"}>` (vaul; alça sempre visível no bottom) |
| Gráficos | recharts 3 (`accessibilityLayer` default `true`) | recharts 2.15 (passe `accessibilityLayer`) |
| Densidade | base-mira (`Button` `h-7`, `Card` 16px, `text-xs`) | new-york (`Button` `h-9`, `Card` `py-6`, `text-sm`) |

Exemplo (gráfico interativo na v2.x):

```tsx
<CardAction>
  <ToggleGroup
    type="single"
    value={timeRange}
    onValueChange={setTimeRange}
    variant="outline"
    className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
  >
    <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
    <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
    <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
  </ToggleGroup>
  <Select value={timeRange} onValueChange={setTimeRange}>
    <SelectTrigger className="flex w-40 @[767px]/card:hidden" size="sm" aria-label="Select a value">
      <SelectValue placeholder="Last 3 months" />
    </SelectTrigger>
    {/* SelectContent igual */}
  </Select>
</CardAction>
```

Exemplo (`TableCellViewer` na v2.x):

```tsx
<Drawer direction={isMobile ? "bottom" : "right"}>
  <DrawerTrigger asChild>
    <Button variant="link" className="w-fit px-0 text-left text-foreground">
      {item.header}
    </Button>
  </DrawerTrigger>
  <DrawerContent>
    {/* ... */}
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose asChild>
        <Button variant="outline">Done</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

