Vagrant.configure("2") do |config|
  #config.vm.box = "chef/ubuntu-14.04"
  config.vm.box = "hashicorp/precise32"

  config.vm.network "forwarded_port", guest: 8080, host: 8081

  config.vm.provider "virtualbox" do |vb|
     vb.customize ["modifyvm", :id, "--memory", "2048", "--cpus", "1", "--cpuexecutioncap", "100"]
  end

  #config.vm.provision "shell", inline: "/usr/bin/apt-get update"

  #config.vm.provision "shell", inline: "/usr/bin/apt-get install -qq puppet"

  config.vm.provision "puppet" do |puppet|
    puppet.manifests_path = "puppet/manifests"
    puppet.manifest_file = "maui-ui.pp"
    puppet.module_path = "puppet/modules"
  end
end
