import { MesConnectionForm } from '@/components/MesConnectionForm';
import { LangFlowIntegrationForm } from '@/components/LangFlowIntegrationForm';

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">MES Connection</h2>
        <MesConnectionForm />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">LangFlow Integration</h2>
        <LangFlowIntegrationForm />
      </div>
    </div>
  );
}
