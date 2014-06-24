class { 'redis::install': }

class { 'nodejs':
  make_install => false,
}

redis::server { 'node': }

class { 'gruntserver': }

