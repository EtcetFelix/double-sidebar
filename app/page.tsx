// app/page.tsx
export default function Home() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Double Sidebar Component</h1>
        <p className="text-lg text-muted-foreground mb-6">
          A composable, collapsible sidebar component with nested navigation.
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-2">Features</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Hover to expand, click outside to collapse</li>
              <li>Two-level navigation with sub-menus</li>
              <li>Admin-only menu items (badge indicators)</li>
              <li>Customizable footer with user dropdown</li>
              <li>Icon-only collapsed state with tooltips</li>
              <li>Smooth animations and transitions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Try it out</h2>
            <p className="text-muted-foreground">
              Hover over the sidebar on the left to expand it. Click on menu items with 
              arrows to see sub-navigation. The footer shows user information with a dropdown menu.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Installation</h2>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>pnpm add @yourpackage/double-sidebar</code>
            </pre>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Basic Usage</h2>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`import { DoubleSidebar, SidebarProvider } from '@/components/double-sidebar'
import { NavUser } from '@/components/double-sidebar/higherlevel/nav-user'

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <DoubleSidebar 
        isAdmin={false}
        footer={
          <NavUser 
            user={{
              name: "John Doe",
              email: "john@example.com"
            }}
            onSignOut={async () => {
              // Your sign out logic
            }}
          />
        }
      />
      <main>{children}</main>
    </SidebarProvider>
  )
}`}</code>
            </pre>
          </section>
        </div>
      </div>
    </div>
  )
}