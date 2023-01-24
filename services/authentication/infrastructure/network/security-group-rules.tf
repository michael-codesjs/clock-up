resource "aws_security_group_rule" "ingress" {
  type              = "ingress"
  cidr_blocks       = ["0.0.0.0/0"]
  protocol          = -1
  from_port         = 0
  to_port           = 0
  security_group_id = aws_security_group.security_group.id
}

resource "aws_security_group_rule" "egress" {
  type              = "egress"
  cidr_blocks       = ["0.0.0.0/0"]
  protocol          = -1
  from_port         = 0
  to_port           = 0
  security_group_id = aws_security_group.security_group.id
}
