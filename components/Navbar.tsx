"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/lib/LanguageContext";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const NAV_LINKS = [
    { href: "/crops", label: t.nav.crops },
    { href: "/pests", label: t.nav.pests },
    { href: "/calendar", label: t.nav.calendar },
  ];

  return (
    <nav className="flex justify-between items-center px-4 sm:px-6 py-4 border-b bg-white">
      <Link href="/" className="font-bold text-base sm:text-lg text-green-800">
        Agriculture Learning Hub Zambia
      </Link>

      <div className="hidden md:flex items-center gap-6">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm hover:text-green-700"
          >
            {link.label}
          </Link>
        ))}

        <LanguageSwitcher />

        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="text-sm px-4 py-2 rounded-md border border-green-700 text-green-700 hover:bg-green-50">
              {t.nav.signIn}
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="text-sm px-4 py-2 rounded-md bg-green-700 text-white hover:bg-green-800">
              {t.nav.signUp}
            </button>
          </SignUpButton>
        </Show>

        <Show when="signed-in">
          <Link href="/dashboard" className="text-sm hover:text-green-700">
            {t.nav.dashboard}
          </Link>
          <UserButton />
        </Show>
      </div>

      <div className="flex items-center gap-3 md:hidden">
        <Show when="signed-in">
          <UserButton />
        </Show>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <button
                type="button"
                aria-label="Open navigation menu"
                className="p-2 rounded-md hover:bg-gray-100 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
              >
                <Menu className="w-6 h-6" />
              </button>
            }
          />
          <SheetContent side="right" className="w-64">
            <SheetTitle className="text-green-800 mb-6">Menu</SheetTitle>
            <div className="flex flex-col gap-4">
              <LanguageSwitcher />

              {NAV_LINKS.map((link) => (
                <SheetClose
                  key={link.href}
                  nativeButton={false}
                  render={
                    <Link
                      href={link.href}
                      className="text-base hover:text-green-700"
                    >
                      {link.label}
                    </Link>
                  }
                />
              ))}

              <Show when="signed-in">
                <SheetClose
                  nativeButton={false}
                  render={
                    <Link href="/dashboard" className="text-base hover:text-green-700">
                      {t.nav.dashboard}
                    </Link>
                  }
                />
              </Show>

              <Show when="signed-out">
                <SheetClose
                  render={
                    <SignInButton mode="modal">
                      <button className="text-base text-left px-4 py-2 rounded-md border border-green-700 text-green-700 hover:bg-green-50">
                        {t.nav.signIn}
                      </button>
                    </SignInButton>
                  }
                />
                <SheetClose
                  render={
                    <SignUpButton mode="modal">
                      <button className="text-base text-left px-4 py-2 rounded-md bg-green-700 text-white hover:bg-green-800">
                        {t.nav.signUp}
                      </button>
                    </SignUpButton>
                  }
                />
              </Show>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}