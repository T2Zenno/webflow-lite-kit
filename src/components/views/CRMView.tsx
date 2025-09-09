import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Plus, User, TrendingUp, Target, Award } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  note: string;
  stage: 'to-contact' | 'in-progress' | 'won' | 'lost';
}

const stages = [
  { id: 'to-contact', label: 'To Contact', color: 'bg-muted' },
  { id: 'in-progress', label: 'In Progress', color: 'bg-warning/20' },
  { id: 'won', label: 'Won', color: 'bg-success/20' },
  { id: 'lost', label: 'Lost', color: 'bg-destructive/20' },
];

export const CRMView: React.FC = () => {
  const [leads, setLeads] = React.useState<Lead[]>([
    { id: '1', name: 'John Doe', note: 'Interested in premium package', stage: 'to-contact' },
    { id: '2', name: 'Jane Smith', note: 'Follow up next week', stage: 'in-progress' },
  ]);

  const handleAddLead = () => {
    const name = prompt('Nama lead:');
    if (name) {
      const newLead: Lead = {
        id: Date.now().toString(),
        name,
        note: '',
        stage: 'to-contact'
      };
      setLeads(prev => [...prev, newLead]);
    }
  };

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData('text/plain', leadId);
  };

  const handleDrop = (e: React.DragEvent, newStage: string) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('text/plain');
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, stage: newStage as Lead['stage'] } : lead
    ));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="p-6 h-full overflow-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">CRM</h1>
            <p className="text-muted-foreground">Kelola leads dan pipeline penjualan</p>
          </div>
          
          <Button onClick={handleAddLead}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Lead
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Leads</p>
                  <p className="text-2xl font-bold">{leads.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-warning">
                    {leads.filter(l => l.stage === 'in-progress').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Won</p>
                  <p className="text-2xl font-bold text-success">
                    {leads.filter(l => l.stage === 'won').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold">
                    {leads.length > 0 ? Math.round((leads.filter(l => l.stage === 'won').length / leads.length) * 100) : 0}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stages.map((stage) => (
            <Card key={stage.id} className={stage.color}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  {stage.label}
                  <span className="ml-2 text-xs bg-background/80 px-2 py-1 rounded">
                    {leads.filter(l => l.stage === stage.id).length}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent 
                className="space-y-3 min-h-[400px]"
                onDrop={(e) => handleDrop(e, stage.id)}
                onDragOver={handleDragOver}
              >
                {leads
                  .filter(lead => lead.stage === stage.id)
                  .map((lead) => (
                    <Card 
                      key={lead.id}
                      className="p-3 cursor-move hover:shadow-md transition-shadow"
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead.id)}
                    >
                      <h4 className="font-medium text-sm">{lead.name}</h4>
                      {lead.note && (
                        <p className="text-xs text-muted-foreground mt-1">{lead.note}</p>
                      )}
                    </Card>
                  ))}
                
                {leads.filter(l => l.stage === stage.id).length === 0 && (
                  <div className="text-center text-muted-foreground text-sm py-8">
                    Drop leads here
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};