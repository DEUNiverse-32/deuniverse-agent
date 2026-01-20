import Header from './components/Header';
import Dossier from './components/Dossier';
import InternalLogs from './components/InternalLogs';
import ExternalGateway from './components/ExternalGateway';
import Archive from './components/Archive';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050510] text-slate-300 relative selection:bg-red-900 selection:text-white overflow-x-hidden">
      <main className="container mx-auto px-6 py-24 max-w-5xl relative z-10">
        <Header />
        
        <div className="space-y-48 mt-32">
          <section id="dossier">
            <Dossier />
          </section>

          <section id="internal-logs">
            <InternalLogs />
          </section>

          <section id="external-gateway">
            <ExternalGateway />
          </section>

          <section id="archive">
            <Archive />
          </section>
        </div>

        <footer className="mt-64 mb-16 text-center border-t border-slate-900 pt-12">
          <p className="text-[10px] text-slate-600 tracking-[0.4em] uppercase font-mono">
            © 2024 DEUNiverse. ALL RIGHTS RESERVED. UNAUTHORIZED DECLASSIFICATION PROHIBITED.
          </p>
        </footer>
      </main>
    </div>
  );
}