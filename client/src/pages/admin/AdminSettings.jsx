import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Settings,
  Save,
  Shield,
  Bell,
  Mail,
  Globe,
  Database,
  Key,
  Users,
  CreditCard,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    // Platform Settings
    platformName: 'Gravity Teacher Hiring Platform',
    platformDescription: 'Connect teachers with schools seamlessly',
    maintenanceMode: false,
    registrationEnabled: true,
    
    // Email Settings
    emailNotifications: true,
    welcomeEmails: true,
    marketingEmails: false,
    
    // Security Settings
    twoFactorAuth: true,
    passwordExpiry: 90,
    maxLoginAttempts: 5,
    
    // Payment Settings
    commissionRate: 5,
    paymentGateway: 'stripe',
    autoPayouts: true,
    
    // Notification Settings
    pushNotifications: true,
    smsNotifications: false,
    emailAlerts: true
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    // Save settings logic here
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
          <p className="text-gray-600 mt-1">Configure platform settings and preferences</p>
        </div>
        <Button 
          onClick={handleSaveSettings}
          className="bg-gradient-to-r from-[#6C5CE7] to-[#5A4FCF]"
        >
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Configuration */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-purple-600" />
              <CardTitle>Platform Configuration</CardTitle>
            </div>
            <CardDescription>Basic platform settings and information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="platformName">Platform Name</Label>
              <Input
                id="platformName"
                value={settings.platformName}
                onChange={(e) => handleSettingChange('platformName', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="platformDescription">Platform Description</Label>
              <Textarea
                id="platformDescription"
                value={settings.platformDescription}
                onChange={(e) => handleSettingChange('platformDescription', e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-gray-500">Temporarily disable platform access</p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>User Registration</Label>
                <p className="text-sm text-gray-500">Allow new user registrations</p>
              </div>
              <Switch
                checked={settings.registrationEnabled}
                onCheckedChange={(checked) => handleSettingChange('registrationEnabled', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              <CardTitle>Security Settings</CardTitle>
            </div>
            <CardDescription>Platform security and authentication settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
              </div>
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
              />
            </div>

            <div>
              <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
              <Input
                id="passwordExpiry"
                type="number"
                value={settings.passwordExpiry}
                onChange={(e) => handleSettingChange('passwordExpiry', parseInt(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
              <Input
                id="maxLoginAttempts"
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              <CardTitle>Email Settings</CardTitle>
            </div>
            <CardDescription>Configure email notifications and communications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-500">Send system email notifications</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Welcome Emails</Label>
                <p className="text-sm text-gray-500">Send welcome emails to new users</p>
              </div>
              <Switch
                checked={settings.welcomeEmails}
                onCheckedChange={(checked) => handleSettingChange('welcomeEmails', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Marketing Emails</Label>
                <p className="text-sm text-gray-500">Send promotional emails</p>
              </div>
              <Switch
                checked={settings.marketingEmails}
                onCheckedChange={(checked) => handleSettingChange('marketingEmails', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-orange-600" />
              <CardTitle>Payment Settings</CardTitle>
            </div>
            <CardDescription>Configure payment processing and commissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="commissionRate">Commission Rate (%)</Label>
              <Input
                id="commissionRate"
                type="number"
                value={settings.commissionRate}
                onChange={(e) => handleSettingChange('commissionRate', parseFloat(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="paymentGateway">Payment Gateway</Label>
              <select
                id="paymentGateway"
                value={settings.paymentGateway}
                onChange={(e) => handleSettingChange('paymentGateway', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="stripe">Stripe</option>
                <option value="razorpay">Razorpay</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Auto Payouts</Label>
                <p className="text-sm text-gray-500">Automatically process payouts</p>
              </div>
              <Switch
                checked={settings.autoPayouts}
                onCheckedChange={(checked) => handleSettingChange('autoPayouts', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-purple-600" />
              <CardTitle>Notification Settings</CardTitle>
            </div>
            <CardDescription>Configure notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Push Notifications</Label>
                <p className="text-sm text-gray-500">Send push notifications to users</p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>SMS Notifications</Label>
                <p className="text-sm text-gray-500">Send SMS notifications</p>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Email Alerts</Label>
                <p className="text-sm text-gray-500">Send email alerts for important events</p>
              </div>
              <Switch
                checked={settings.emailAlerts}
                onCheckedChange={(checked) => handleSettingChange('emailAlerts', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-gray-600" />
              <CardTitle>System Information</CardTitle>
            </div>
            <CardDescription>Platform system status and information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Platform Version</Label>
                <p className="text-lg font-semibold">v2.1.0</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Database Status</Label>
                <p className="text-lg font-semibold text-green-600">Connected</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Server Uptime</Label>
                <p className="text-lg font-semibold">99.9%</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Last Backup</Label>
                <p className="text-lg font-semibold">2 hours ago</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full">
                <Database className="w-4 h-4 mr-2" />
                Create Database Backup
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Danger Zone */}
      <Card className="border-red-200 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
          </div>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
            <div>
              <h4 className="font-medium text-red-900">Reset Platform Data</h4>
              <p className="text-sm text-red-600">This will permanently delete all platform data</p>
            </div>
            <Button variant="destructive">
              Reset Platform
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;