import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TrendingUp, DollarSign, ShoppingCart, Users } from 'lucide-react';
import { usePageBuilder } from '../../hooks/usePageBuilder';

export const AnalyticsView: React.FC = () => {
  const { orders, customers } = usePageBuilder();

  const totalRevenue = orders
    .filter(order => order.status === 'paid')
    .reduce((sum, order) => sum + order.total, 0);

  const monthlyData = React.useMemo(() => {
    const now = new Date();
    const months = [];
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthOrders = orders.filter(order => {
        const orderDate = new Date(order.date);
        return orderDate.getMonth() === date.getMonth() && 
               orderDate.getFullYear() === date.getFullYear() &&
               order.status === 'paid';
      });
      
      months.push({
        month: date.toLocaleDateString('id-ID', { month: 'short' }),
        revenue: monthlyData.reduce((sum, order) => sum + order.total, 0),
        orders: monthlyData.length
      });
    }
    
    return months;
  }, [orders]);

  return (
    <div className="p-6 h-full overflow-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Ringkasan performa bisnis dan penjualan</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">Rp {totalRevenue.toLocaleString('id-ID')}</p>
                  <p className="text-xs text-success mt-1">+12% dari bulan lalu</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">{orders.length}</p>
                  <p className="text-xs text-success mt-1">+8% dari bulan lalu</p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Customers</p>
                  <p className="text-2xl font-bold">{customers.length}</p>
                  <p className="text-xs text-warning mt-1">+5% dari bulan lalu</p>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Order Value</p>
                  <p className="text-2xl font-bold">
                    Rp {orders.length > 0 ? Math.round(totalRevenue / orders.length).toLocaleString('id-ID') : 0}
                  </p>
                  <p className="text-xs text-success mt-1">+3% dari bulan lalu</p>
                </div>
                <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-center gap-4 p-4">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-12 bg-primary rounded-t"
                      style={{ 
                        height: `${Math.max(20, (data.revenue / Math.max(...monthlyData.map(d => d.revenue))) * 200)}px` 
                      }}
                    ></div>
                    <span className="text-xs text-muted-foreground mt-2">{data.month}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Paid</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-muted rounded-full">
                      <div 
                        className="h-full bg-success rounded-full"
                        style={{ 
                          width: `${orders.length > 0 ? (orders.filter(o => o.status === 'paid').length / orders.length) * 100 : 0}%` 
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {orders.filter(o => o.status === 'paid').length}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Pending</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-muted rounded-full">
                      <div 
                        className="h-full bg-warning rounded-full"
                        style={{ 
                          width: `${orders.length > 0 ? (orders.filter(o => o.status === 'pending').length / orders.length) * 100 : 0}%` 
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {orders.filter(o => o.status === 'pending').length}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Cancelled</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-muted rounded-full">
                      <div 
                        className="h-full bg-destructive rounded-full"
                        style={{ 
                          width: `${orders.length > 0 ? (orders.filter(o => o.status === 'cancelled').length / orders.length) * 100 : 0}%` 
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {orders.filter(o => o.status === 'cancelled').length}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New order from {order.customer}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.product} - Rp {order.total.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(order.date).toLocaleDateString('id-ID')}
                  </span>
                </div>
              ))}
              
              {orders.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  Belum ada aktivitas
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};