# Login to Azure
Connect-AzAccount

# Variables
$resourceGroupName = "example-resource-group"
$location = "EastUS"
$vmName = "ExampleVM"
$vmSize = "Standard_DS1_v2"
$adminUsername = "azureuser"
$adminPassword = ConvertTo-SecureString "P@ssw0rd123!" -AsPlainText -Force

# Create a resource group
New-AzResourceGroup -Name $resourceGroupName -Location $location

# Create a virtual network
$vnet = New-AzVirtualNetwork -ResourceGroupName $resourceGroupName -Location $location `
  -Name "ExampleVNet" -AddressPrefix "10.0.0.0/16"

# Create a subnet
$subnet = Add-AzVirtualNetworkSubnetConfig -Name "ExampleSubnet" -AddressPrefix "10.0.1.0/24" -VirtualNetwork $vnet
$vnet | Set-AzVirtualNetwork

# Create a public IP address
$publicIp = New-AzPublicIpAddress -ResourceGroupName $resourceGroupName -Location $location `
  -Name "ExamplePublicIP" -AllocationMethod Static

# Create a network security group
$nsg = New-AzNetworkSecurityGroup -ResourceGroupName $resourceGroupName -Location $location `
  -Name "ExampleNSG"

# Create a network interface
$nic = New-AzNetworkInterface -ResourceGroupName $resourceGroupName -Location $location `
  -Name "ExampleNIC" -SubnetId $subnet.Id -PublicIpAddressId $publicIp.Id -NetworkSecurityGroupId $nsg.Id

# Create a virtual machine configuration
$vmConfig = New-AzVMConfig -VMName $vmName -VMSize $vmSize |
  Set-AzVMOperatingSystem -Windows -ComputerName $vmName -Credential (New-Object PSCredential ($adminUsername, $adminPassword)) |
  Set-AzVMSourceImage -PublisherName "MicrosoftWindowsServer" -Offer "WindowsServer" -Skus "2019-Datacenter" -Version "latest" |
  Add-AzVMNetworkInterface -Id $nic.Id

# Create the virtual machine
New-AzVM -ResourceGroupName $resourceGroupName -Location $location -VM $vmConfig