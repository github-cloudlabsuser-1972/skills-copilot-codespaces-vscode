# Login to Azure
Connect-AzAccount

# Set variables
$resourceGroupName = "example-resources"
$location = "West Europe"
$storageAccountName = "examplestorageacc"

# Create a resource group
New-AzResourceGroup -Name $resourceGroupName -Location $location

# Create a storage account
New-AzStorageAccount -ResourceGroupName $resourceGroupName -Name $storageAccountName -Location $location -SkuName Standard_LRS