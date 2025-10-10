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
              Hover over the sidebar on the left to expand it. The footer shows authenticated user information with a dropdown menu (not shown in this demo).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Get the Code</h2>
            <p className="text-muted-foreground mb-3">
              View the full source code, customize it for your needs, or contribute on GitHub.
            </p>
            <a 
              href="https://github.com/EtcetFelix/double-sidebar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View on GitHub
            </a>
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