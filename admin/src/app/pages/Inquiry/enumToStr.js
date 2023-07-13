export const CategoryEnumToStr = {
  cloud_estimate: '클라우드 견적',
  public_cloud: '공공 클라우드',
  cloud_consult: '클라우드 컨설팅(아키텍쳐 컨설팅)',
  cloud_migration: '클라우드 구축·마이그레이션',
  cloud_operate_and_manage: '클라우드 운영 및 관리',
  cloud_complience: '클라우드 컴플라이언스',
  cloud_secure_consult: '클라우드 정보보호컨설팅(보안 및 인증 컨설팅)',
  cloud_secure_monit: '클라우드 보안관제',
  partner_ship: '파트너십/제휴',
  solution: '솔루션',
  etc: '기타',
};
export const IndustryEnumToStr = {
  service: '서비스업',
  manufacture_chemical: '제조·화학',
  it_web_communication: 'IT·웹·통신',
  bank_finance: '은행·금융업',
  media_design: '미디어·디자인',
  education: '교육업',
  medical_pharmaceutical_welfare: '의료·제약·복지',
  sale_distribution: '판매·유통',
  construction: '건설업',
  agency_association: '기관·협회',
  etc: '기타',
};
export const CloudEnumToStr = {
  none: '미사용',
  aws: 'AWS',
  azure: 'Azure',
  gcp: 'GCP',
  naver_cloud_platform: 'Naver Cloud Platform',
  koscom: 'Koscom 금융 클라우드',
  nhn_cloud: 'NHN',
  kakao_i_cloud: 'Kakao I Cloud',
  etc: '기타',
};

export const MonitOrComplienceEnumToStr = {
  monit: '관제 서비스 필요',
  complience: '컴플라이언스 대응 필요',
  both: '관제/컴플라이언스 대응 모두 필요',
  nothing: '불필요',
};

export const StorageResourceTypeEnumToStr = {
  NAS: 'File Storage(NAS)',
  object_storage: 'Object Storage',
  archive_storage: 'Archive Storage',
};

export const NetworkResourceEnumToStr = {
  application_load_balancer: 'Application Load Balancer',
  network_load_balancer: 'Network Load Balancer',
  contents_delivery_network: 'Contetns Delivery Network(CDN)',
  domain_name_service: 'Domain Name Service(DNS)',
  site_to_site_vpn: 'Site to Site VPN(IPsec VPN)',
  ssl_vpn: 'SSL VPN',
  private_network: 'Private Network',
  nat_gateway: 'NAT Gateway',
};

export const SecureResourceEnumToStr = {
  web_application_firewall: 'Web Application Firewall(WAF)',
  intrusion_prevention_system: 'Intrusion Prevention System(IPS)',
  anti_ddos: 'Anti-DDos',
  system_access_control_system: 'System Access Control System(시스템접근제어)',
  database_access_control_system: 'Database Access Control System(DB접근제어)',
  backup: 'Backup',
};
