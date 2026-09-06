---
summary: User-level install of the latest Antigravity IDE on Linux when the APT repo is stale and you lack root for the Chrome sandbox.
tags: #antigravity #ide #linux #install #tool #decision
---

# Install Antigravity IDE (latest) on Linux — user-level, no root

**One-line summary:** How to get the newest standalone Antigravity IDE on Linux without root when the distro APT package is frozen on an old build, and how to put it in the App Menu.

## Context / why this exists

- The distro APT package (`antigravity`, e.g. `1.23.2`) is often **frozen** on an old build. Google ships the current standalone IDE only as a tarball.
- The official download page lists the latest IDE version and a Linux x64 tarball URL: `https://antigravity.google/download` → "Antigravity IDE (Standalone)" → "Download for x64".
- Example latest URL pattern: `https://edgedl.me.gvt1.com/edgedl/release2/j0qc3/antigravity/stable/<VER>-<BUILD>/linux-x64/Antigravity%20IDE.tar.gz`
- If you are **not** in a position to `sudo` (or don't want a system-wide install), install to `~/.local/opt` and register a user-level `.desktop` entry. A user `.desktop` in `~/.local/share/applications/` **overrides** a same-named system entry in `/usr/share/applications/`.

## Steps

1. **Find the latest Linux x64 tarball URL** on the download page (version + build number in the path).
2. **Download** to a temp dir:
   ```bash
   curl -fL -o "Antigravity IDE.tar.gz" "<TARBALL_URL>"
   ```
3. **Extract** and inspect the binary name (it is `antigravity-ide`, not `antigravity`):
   ```bash
   mkdir -p extract && tar xzf "Antigravity IDE.tar.gz" -C extract
   ls "extract/Antigravity IDE/"
   ```
4. **Install to home** (rename to drop the space):
   ```bash
   mkdir -p ~/.local/opt
   mv "extract/Antigravity IDE" ~/.local/opt/antigravity-ide
   ```
5. **Icon:** copy the branded SVG out of the bundle for the menu icon:
   ```bash
   cp ~/.local/opt/antigravity-ide/resources/app/out/vs/platform/browserOnboarding/static/antigravity.svg \
      ~/.local/share/icons/antigravity.svg
   ```
6. **App Menu entry** — write `~/.local/share/applications/antigravity.desktop`:
   ```ini
   [Desktop Entry]
   Name=Antigravity IDE
   Comment=Experience liftoff
   GenericName=Text Editor
   Exec=/home/<user>/.local/opt/antigravity-ide/bin/antigravity-ide --no-sandbox %F
   Icon=/home/<user>/.local/share/icons/antigravity.svg
   Type=Application
   StartupNotify=true
   StartupWMClass=antigravity-ide
   Terminal=false
   Categories=TextEditor;Development;IDE;
   MimeType=application/x-antigravity-workspace;text/plain;inode/directory;
   Actions=new-empty-window;

   [Desktop Action new-empty-window]
   Name=New Empty Window
   Exec=/home/<user>/.local/opt/antigravity-ide/bin/antigravity-ide --no-sandbox --new-window %F
   Icon=/home/<user>/.local/share/icons/antigravity.svg
   ```
   - Replace `<user>` with the real home path (or use the absolute path as written on the machine). This file **overrides** the system `antigravity.desktop`, so the menu shows the new version once.
   - The GUI launcher is the wrapper `bin/antigravity-ide` (VS Code-style script). Launching the raw `antigravity-ide` ELF directly triggers a sandbox error.
7. **CLI convenience** (optional):
   ```bash
   ln -sf ~/.local/opt/antigravity-ide/bin/antigravity-ide ~/.local/bin/antigravity-ide
   ```
8. **Refresh** the menu database:
   ```bash
   update-desktop-database ~/.local/share/applications
   desktop-file-validate ~/.local/share/applications/antigravity.desktop
   ```
9. **Verify it launches** on a live display (no sandbox crash, empty log = good):
   ```bash
   ~/.local/opt/antigravity-ide/bin/antigravity-ide --no-sandbox --disable-gpu --new-window &
   sleep 8; pgrep -x antigravity-ide   # expect processes
   pkill -x antigravity-ide            # stop the test instance
   ```

## The sandbox tradeoff (important)

The bundle's `chrome-sandbox` needs to be **owned by root and mode `4755`** (setuid). Without root you cannot set that, so you must launch with **`--no-sandbox`**. That is what the desktop `Exec` above does.

- `--no-sandbox` is fine for a single-user dev box; it lowers renderer isolation.
- To restore the full Chrome sandbox later (needs `sudo`):
  ```bash
  sudo chown root:root ~/.local/opt/antigravity-ide/chrome-sandbox
  sudo chmod 4755 ~/.local/opt/antigravity-ide/chrome-sandbox
  ```
  then remove `--no-sandbox` from the desktop `Exec=`.

## Notes / gotchas

- **A user-level `.desktop` override is NOT enough to switch versions.** It only affects the App Menu entry. If a pinned/dock icon or a typed `antigravity` command is used, the old APT binary (`/usr/share/antigravity/antigravity`) can still launch — and it will, silently. To truly switch to the new build, **purge the APT package**: `sudo apt remove --purge antigravity`. After purge, `/usr/bin/antigravity` and `/usr/share/applications/antigravity.desktop` are gone, leaving only the user-level 2.5.5 entry.
- **The in-app "update" prompt lies about the version.** The standalone IDE's updater reads the *Antigravity 2.0 hub* version feed, so it shows e.g. `2.0.6` (a real hub release, May 22 2026: "Added integration with Antigravity IDE") as "current". The hub app is now at 2.11.0; the standalone IDE's own latest is 2.5.5 (see the `tab=ide` changelog — there is no `2.0.6` in the IDE track). If you are already on 2.5.5, **ignore/dismiss the prompt**; do not accept a downgrade to 2.0.6.
- After `apt purge`, an orphaned `/usr/share/antigravity/resources` directory can remain (dpkg warning: "directory not empty so not removed"). It is harmless and root-owned; remove with `sudo rm -rf /usr/share/antigravity` if you want it gone.
- `antigravity-ide --version` prints the VS Code OSS base version (e.g. `1.107.0`), **not** the IDE marketing version (`2.5.5`). Trust the tarball URL's version stamp.
- If you have a real display (`echo $DISPLAY`), you can verify a GUI launch directly as in step 9.

## Related
- [[index]] — master hub
- [[AGENTS]] — vault agent rules (no machine-specific absolute paths in notes)
