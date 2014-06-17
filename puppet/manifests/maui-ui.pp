class { 'redis::install': }

redis::server { 'node': }

class {
  'nodejs':
    make_install => false
}

